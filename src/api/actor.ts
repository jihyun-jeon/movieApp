import axiosInstance from '@/api/axios';
import { baseSearchParam } from '@/types/movieType';
import { MovieCredit } from '@/types/actor';

/** 영화 크레딧 정보 요청 */
export const fetchCredit = async (movieId: number, queryParams: baseSearchParam) => {
  const { data } = await axiosInstance<MovieCredit>({
    url: `/movie/${movieId}/credits`,
    method: 'get',
    params: queryParams,
  });
  return data;
};
