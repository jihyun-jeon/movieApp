import axiosInstance from './axios';
import { MovieResponse } from '../types/Movie';
import { useQuery } from '@tanstack/react-query';

export const usePopularMovies = (queryParams: { language: string; page: number }) => {
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

export const MoviesQuery = {
  all: ['movies'],
  getMany: (getType: string, queryParams?: any) => [...MoviesQuery.all, getType, queryParams],
};
