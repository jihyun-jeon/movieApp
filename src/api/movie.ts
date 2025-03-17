import axiosInstance from '@/api/axios';
import {
  baseSearchParam,
  genreSearchParam,
  GenresResponse,
  keywordSearchParam,
  MovieDetail,
  MovieResponse,
} from '@/types/movie';

/** 인기 영화 요청 */
export const fetchPopularMovies = async (queryParams: baseSearchParam) => {
  const { data } = await axiosInstance<MovieResponse>({
    url: '/movie/popular',
    method: 'get',
    params: queryParams,
  });
  return data;
};

/** 트렌딩 영화 요청 */
export const fetchTrendingMovies = async (queryParams: baseSearchParam) => {
  const { data } = await axiosInstance<MovieResponse>({
    url: '/trending/movie/day',
    method: 'get',
    params: queryParams,
  });

  return data;
};

/** 장르 목록 요청 */
export const fetchGenres = async (queryParams: baseSearchParam) => {
  const { data } = await axiosInstance<GenresResponse>({
    url: '/genre/movie/list',
    method: 'get',
    params: queryParams,
  });
  return data;
};

/** 장르 필터링된 영화 요청 */
export const fetchGenreFilteredMovies = async (queryParams: genreSearchParam) => {
  const { data } = await axiosInstance<MovieResponse>({
    url: '/discover/movie',
    method: 'get',
    params: queryParams,
  });
  return data;
};

/** 검색어 필터링된 영화 요청 */
export const fetchKeywordFilteredMovies = async (queryParams: keywordSearchParam) => {
  const { data } = await axiosInstance<MovieResponse>({
    url: '/search/movie',
    method: 'get',
    params: queryParams,
  });
  return data;
};

/** 비슷한 영화 요청 */
export const fetchSimilarMovies = async (movieId: number, queryParams: baseSearchParam) => {
  const { data } = await axiosInstance<MovieResponse>({
    url: `/movie/${movieId}/similar`,
    method: 'get',
    params: queryParams,
  });
  return data;
};

/** 영화 세부정보 요청 */
export const fetchMovieDetail = async (movieId: number, queryParams: baseSearchParam) =>
  axiosInstance<MovieDetail>({
    url: `/movie/${movieId}`,
    method: 'get',
    params: queryParams,
  }).then((res) => res.data);
