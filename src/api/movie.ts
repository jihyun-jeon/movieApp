import axiosInstance from '@/api/axios';
import {
  baseSearchParam,
  genreSearchParam,
  GenresResponse,
  keywordSearchParam,
  MovieDetail,
  MovieResponse,
} from '@/types/movie';
import { useQuery } from '@tanstack/react-query';

export const usePopularMoviesQuery = (queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<MovieResponse>({
        url: '/movie/popular',
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('getPopular', queryParams),
  });
};

export const useTrendingMoviesQuery = (queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<MovieResponse>({
        url: '/trending/movie/day',
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('getTrending', queryParams),
  });
};

// 장르 목록 요청
export const useGetGenresQuery = (queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<GenresResponse>({
        url: '/genre/movie/list',
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('genresMovie', queryParams),
  });
};

// 장르 필터
export const useGenreSearchMoviesQuery = (queryParams: genreSearchParam, isFetchEnabled: boolean) => {
  return useQuery({
    enabled: isFetchEnabled,
    queryFn: () => {
      return axiosInstance<MovieResponse>({
        url: '/discover/movie',
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('discoverMovie', queryParams),
  });
};

// 검색어 필터
export const useKeywordSearchMoviesQuery = (queryParams: keywordSearchParam, isFetchEnabled: boolean) => {
  return useQuery({
    enabled: isFetchEnabled,
    queryFn: () => {
      return axiosInstance<MovieResponse>({
        url: '/search/movie',
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('searchMovie', queryParams),
  });
};

// 비슷한 영화
export const useGetSimilarMovieQuery = (movieId: string, queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<MovieResponse>({
        url: `/movie/${movieId}/similar`,
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getMany('similarMovie', movieId),
  });
};

// 영화 세부정보
export const useGetDateilMovieQuery = (movieId: string, queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<MovieDetail>({
        url: `/movie/${movieId}`,
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: MoviesQuery.getOne(movieId),
  });
};

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getCategory: string, queryParams?: any) => [
    ...MoviesQuery.all,
    'getMany',
    getCategory,
    JSON.stringify(queryParams),
  ],
  getOne: (id: string) => [...MoviesQuery.all, 'getOne', id],
};
