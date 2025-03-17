import { useQuery } from '@tanstack/react-query';
import { baseSearchParam } from '@/types/movie';
import { fetchCredit } from '@/api/actor';

/** 영화 크레딧 정보 요청 */
export const useGetCreditQuery = (movieId: number, queryParams: baseSearchParam) =>
  useQuery({
    queryFn: () => fetchCredit(movieId, queryParams),
    queryKey: ActorQueryKeys.getMany('credits', queryParams),
  });

export const ActorQueryKeys = {
  all: ['actor'],
  getMany: (getCategory: string, queryParams?: any) => [
    ...ActorQueryKeys.all,
    'getMany',
    getCategory,
    JSON.stringify(queryParams),
  ],
};
