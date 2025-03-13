import axiosInstance from './axios';
import { MovieResponse } from '../types/Movie';
import { useQuery } from '@tanstack/react-query';

export const usePopularMovies = (queryParams: { language: string; page?: number }) => {
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

export const useTrendingMovies = (queryParams: { language: string; page?: number }) => {
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

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getCategory: string, queryParams?: any) => [...MoviesQuery.all, getCategory, JSON.stringify(queryParams)],
};
