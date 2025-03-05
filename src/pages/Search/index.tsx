import { useLocation } from 'react-router-dom';
import { useKeywordSearchMovies } from '../../api/tmdb';
import { Movie } from '../../types/Movie';
import { getImageUrl } from '../../utils/tmdbUtils';
import { TMDB_LANGUAGE_KR } from '../../contants';

const Search = () => {
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('query') || '';

  const trandingMovies = useKeywordSearchMovies({
    language: TMDB_LANGUAGE_KR,
    page: 1,
    query: keyword,
  });

  return (
    <div className="px-36">
      Search
      <ul>
        {trandingMovies.data?.results.map((movie: Movie) => {
          return (
            <li key={movie.id}>
              {movie.title}
              {movie.poster_path && (
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
