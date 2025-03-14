import { useGetSimilarMovieQuery } from '@/api/movie';
import { TMDB_LANGUAGE_KR } from '@/contants';
import { getImageUrl } from '@/utils/tmdbUtils';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useNavigateToContents from '@/hooks/usePathParams';
import PosterImage from '@/components/PosterImage';
import '@/styles/custom.css';
import { useGetCreditQuery } from '@/api/actor';
import DetailHeader from '@/pages/Detail/components/DetailHeader';
import { useAuth } from '@/context/AuthContext';
import SpinnerPortal from '@/components/Spinner';
import Comments from '@/pages/Detail/components/Comments';

export default function Detail() {
  const [mode, setMode] = useState('info');
  const { movieId } = useParams();

  const credit = useGetCreditQuery(movieId!, { language: TMDB_LANGUAGE_KR });
  const similar = useGetSimilarMovieQuery(movieId!, { language: TMDB_LANGUAGE_KR });

  const { updatePathParam } = useNavigateToContents();

  const { loading } = useAuth();

  useEffect(() => {
    setMode('info');
  }, [movieId]);

  return (
    <>
      {loading && <SpinnerPortal />}
      <DetailHeader movieId={movieId!} />
      <main className="px-36">
        {/* 토글버튼 */}
        <div className="pt-3 flex justify-center">
          <ToggleGroup
            type="single"
            value={`${mode}`}
            onValueChange={(v) => {
              setMode(v);
            }}
            aria-label="Genre selection"
            className="flex flex-wrap gap-2"
          >
            {CONTENTS_TAPS.map((data) => (
              <ToggleGroupItem
                value={data.value}
                key={data.value}
                className={`flex-none mr-1 py-2 px-4 rounded-lg transition-colors duration-200 border text-[#84868d] ${
                  mode?.includes(data.value) ? 'bg-white border-white' : 'bg-black border-[#84868d]'
                }`}
              >
                {data.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {/* 출연진 */}
        {mode === 'info' && (
          <>
            <div className="py-5">
              <h2 className="font-semibold">감독/출연진</h2>

              <ul className="grid grid-cols-2 gap-4 mt-5">
                {credit.data?.cast.slice(0, 10).map((data) => (
                  <li key={data.credit_id} className="flex">
                    <div className="w-16">
                      {data.profile_path && <img src={getImageUrl(data.profile_path, 'w342')} className="w-full" />}
                    </div>
                    <div className="flex flex-col justify-center ml-2">
                      <p className="py-1"> {data.name}</p>
                      <p className="py-1"> {data.character}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="py-5">
              <h2 className="font-semibold">사용자 리뷰</h2>
              <Comments movieId={Number(movieId!)} />
            </div>
          </>
        )}

        {/* 관련 영화 */}
        {mode === 'related' && (
          <div className="mx-0 my-auto">
            <h2 className="font-semibold">비슷한 콘텐츠</h2>
            <div className=" flex flex-wrap justify-start gap-5">
              {similar.data?.results.map((movie) => (
                <div
                  key={movie.id}
                  className="w-52  flex flex-col"
                  onClick={() => {
                    updatePathParam('/movie', movie.id);
                  }}
                >
                  <PosterImage posterPath={movie.poster_path} size="w500" />
                  <div className="ellipsis-base ellipsis-2"> {movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const CONTENTS_TAPS = [
  { name: '콘텐츠 정보', value: 'info' },
  { name: '관련 콘텐츠', value: 'related' },
];
