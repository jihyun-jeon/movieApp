import { useEffect, useState } from 'react';
import { useGenreSearchMoviesQuery, useKeywordSearchMoviesQuery } from '@/hooks/query/useMovie';
import { Movie } from '@/types/movieType';
import { TMDB_LANGUAGE_KR } from '@/contants';
import ToggleButtons from '@/pages/Search/components/ToggleButtons';
import useUrlParams from '@/hooks/useUrlParams';
import usePathParams from '@/hooks/usePathParams';
import PosterImage from '@/components/PosterImage';

const Search = () => {
  const { useStringQueryState } = useUrlParams();
  const [searchKeyword] = useStringQueryState('query');
  const [genreParam, setGenreParam] = useStringQueryState('with_genres');

  const { updatePathParam } = usePathParams();

  const initialGenres = genreParam ? genreParam.split(',') : [];
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);

  useEffect(() => {
    setGenreParam(selectedGenres.join(','));
  }, [selectedGenres]);

  // 장르 필터 > 장르 api만 / 키워드 필터 > 키워드 api만 / 장르+키워드 필터 > 키워드 api만
  const isGenreFiltered = selectedGenres.length > 0 && !searchKeyword;
  const isKeywordFiltered = !!searchKeyword;

  // 장르 필터
  const genreMovies = useGenreSearchMoviesQuery(
    {
      language: TMDB_LANGUAGE_KR,
      page: 1,
      with_genres: genreParam,
    },
    isGenreFiltered && !!genreParam, // 빈 string이면 api 호출X
  );

  // 키워드 필터
  const keywordMovies = useKeywordSearchMoviesQuery(
    {
      language: TMDB_LANGUAGE_KR,
      page: 1,
      query: searchKeyword || '',
    },
    isKeywordFiltered,
  );

  const filteredMovieList = (() => {
    const genreData = genreMovies.data?.results || [];
    const keywordData = keywordMovies.data?.results || [];

    // 장르와 키워드 필터 모두 있을 경우
    if (selectedGenres.length > 0 && keywordData.length > 0) {
      return keywordData.filter((movie) => selectedGenres.every((genre) => movie.genre_ids.includes(+genre)));
    } else if (keywordData.length > 0) {
      return keywordData; // 키워드 필터만
    } else if (genreData.length > 0) {
      return genreData; // 장르 필터만
    }
  })();

  return (
    <div className="px-36">
      Search
      <ToggleButtons selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5">
        {filteredMovieList?.map((movie: Movie) => (
          <li
            key={movie.id}
            onClick={() => {
              updatePathParam('/movie', movie.id);
            }}
            className="w-full h-auto rounded-lg"
          >
            <div className="w-full aspect-[3/4] rounded-lg">
              <PosterImage posterPath={movie?.poster_path} size="w500" />
            </div>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
