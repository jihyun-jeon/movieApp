import axiosInstance from './axios';
import { baseSearchParam, keywordSearchParam, MovieResponse } from '../types/Movie';
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

// 검색어 필터
export const useKeywordSearchMovies = (queryParams: keywordSearchParam) => {
  return useQuery({
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
