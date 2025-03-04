import { usePopularMovies } from '../../api/tmdb';
import { Movie } from '../../types/Movie';
import { getImageUrl } from '../../utils/tmdbUtils';

const Home = () => {
  const { data: movies, isLoading, isError } = usePopularMovies({ language: 'ko-KR', page: 1 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="text-white">
      {/* hero */}
      <ul>
        {movies?.results.map((movie: Movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            {movie.poster_path && <img src={getImageUrl(movie.poster_path, 'w500')} alt={movie.title} />}
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average} / 10</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
