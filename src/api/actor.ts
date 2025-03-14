import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { baseSearchParam } from '@/types/movie';
import { MovieCredit } from '@/types/actor';

// 영화 크레딧
export const useGetCreditQuery = (movieId: string, queryParams: baseSearchParam) => {
  return useQuery({
    queryFn: () => {
      return axiosInstance<MovieCredit>({
        url: `/movie/${movieId}/credits`,
        method: 'get',
        params: queryParams,
      }).then((res) => res.data);
    },
    queryKey: ActorQuery.getMany('credits', queryParams),
  });
};

export const ActorQuery = {
  all: ['actor'],
  getMany: (getCategory: string, queryParams?: any) => [
    ...ActorQuery.all,
    'getMany',
    getCategory,
    JSON.stringify(queryParams),
  ],
};
