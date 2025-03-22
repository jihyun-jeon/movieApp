import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addFavorite, deleteFavorite, fetchFavorites, fetchFavoritesByMovie } from '@/api/favorite';

/** 즐겨찾기 조회  */
export const useGetFavoriteQuery = () =>
  useQuery({
    queryFn: fetchFavorites,
    queryKey: FavoriteQuery.all,
  });

/**  특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회 */
export const useGetFavoriteByMovieQuery = (movieId: number, userId: string) =>
  useQuery({
    queryFn: () => fetchFavoritesByMovie({ movieId, userId }),
    queryKey: FavoriteQuery.all,
    enabled: !!movieId && !!userId,
  });

/** 즐겨찾기 추가 */
export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      alert('찜 추가 완료!');
      queryClient.invalidateQueries({ queryKey: FavoriteQuery.all });
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

/** 즐겨찾기 삭제  */
export const useDeleteFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      alert('찜 삭제 완료!');
      queryClient.invalidateQueries({ queryKey: FavoriteQuery.all });
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export const FavoriteQuery = {
  all: ['favorite'],
};
