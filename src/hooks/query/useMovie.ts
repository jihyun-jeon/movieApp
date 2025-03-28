import { useQuery } from '@tanstack/react-query';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchGenres,
  fetchGenreFilteredMovies,
  fetchKeywordFilteredMovies,
  fetchSimilarMovies,
  fetchMovieDetail,
} from '@/api/movie';
import { baseSearchParam, genreSearchParam, keywordSearchParam } from '@/types/movieType';

/** 인기 영화 요청 */
export const usePopularMoviesQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchPopularMovies(queryParams),
    queryKey: MoviesQuery.getMany('getPopular', queryParams),
  });

/** 트렌딩 영화 요청 */
export const useTrendingMoviesQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchTrendingMovies(queryParams),
    queryKey: MoviesQuery.getMany('getTrending', queryParams),
  });

/** 장르 목록 요청 */
export const useGetGenresQuery = (queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchGenres(queryParams),
    queryKey: MoviesQuery.getMany('getGenres', queryParams),
  });

/** 장르 필터링된 영화 요청 */
export const useGenreSearchMoviesQuery = (queryParams: genreSearchParam, isFetchEnabled: boolean) =>
  useQuery({
    enabled: isFetchEnabled,
    queryFn: () => fetchGenreFilteredMovies(queryParams),
    queryKey: MoviesQuery.getMany('discoverMovie', queryParams),
  });

/** 검색어 필터링된 영화 요청 */
export const useKeywordSearchMoviesQuery = (queryParams: keywordSearchParam, isFetchEnabled: boolean) =>
  useQuery({
    enabled: isFetchEnabled,
    queryFn: () => fetchKeywordFilteredMovies(queryParams),
    queryKey: MoviesQuery.getMany('searchMovie', queryParams),
  });

/** 비슷한 영화 요청 */
export const useGetSimilarMovieQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchSimilarMovies(movieId, queryParams),
    queryKey: MoviesQuery.getMany('similarMovie', movieId),
  });

/** 영화 세부정보 요청 */
export const useGetDetailMovieQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchMovieDetail(movieId, queryParams),
    queryKey: MoviesQuery.getOne(movieId),
  });

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getCategory: string, queryParams?: any) => [
    ...MoviesQuery.all,
    'getMany',
    getCategory,
    JSON.stringify(queryParams),
  ],
  getOne: (id: number) => [...MoviesQuery.all, 'getOne', id],
};
