import axiosInstance from '@/api/axios';
import { baseSearchParam, genreSearchParam, GenresResponse, keywordSearchParam, MovieResponse } from '@/types/movie';
import { useQuery } from '@tanstack/react-query';

export const usePopularMovies = (queryParams: baseSearchParam) => {
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

export const useTrendingMovies = (queryParams: baseSearchParam) => {
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
export const useGetGenres = (queryParams: baseSearchParam) => {
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
export const useGenreSearchMovies = (queryParams: genreSearchParam, isFetchEnabled: boolean) => {
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
export const useKeywordSearchMovies = (queryParams: keywordSearchParam, isFetchEnabled: boolean) => {
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

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getCategory: string, queryParams?: any) => [...MoviesQuery.all, getCategory, JSON.stringify(queryParams)],
};
