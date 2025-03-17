import { usePopularMoviesQuery, useTrendingMoviesQuery } from '@/hooks/query/useMovie';
import PosterImage from '@/components/PosterImage';
import { TMDB_LANGUAGE_KR } from '@/contants';
import useNavigateToContents from '@/hooks/usePathParams';
import { Movie } from '@/types/movie';
import Carousel from '@/components/Carousel';

const Home = () => {
  const popularMovies = usePopularMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });
  const trandingMovies = useTrendingMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });

  const { updatePathParam } = useNavigateToContents();

  return (
    <div className="text-white px-36">
      {/* Hero Carousel */}
      {popularMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-4">인기 영화</h1>
          <Carousel autoPlay={true} showIndicators={true} showArrows={true} itemsPerPage={1} interval={3000}>
            {popularMovies.data?.results.slice(0, 5).map((movie: Movie) => (
              <div
                key={movie.id}
                className="relative  w-full  h-[400px] cursor-pointer"
                onClick={() => updatePathParam('.', movie.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-10 z-20">
                  <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-gray-300 line-clamp-2 max-w-2xl">{movie.overview}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Day Carousel */}
      {trandingMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-4">오늘의 인기작 TOP 20</h1>
          <Carousel autoPlay={false} showIndicators={false} showArrows={true} itemsPerPage={5}>
            {trandingMovies.data?.results.map((movie: Movie) => (
              <div key={movie.id} className="w-1/5 px-2 cursor-pointer" onClick={() => updatePathParam('.', movie.id)}>
                <div className="relative">
                  <PosterImage posterPath={movie?.poster_path} size="w342" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default Home;
