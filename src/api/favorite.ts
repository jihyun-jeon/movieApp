import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export const useGetFavorite = () => {
  return useQuery({
    queryFn: async () => {
      return await supabase.from('Favorites').select('*');
    },
    queryKey: FavoriteQuery.all,
  });
};

interface favoriteDataType {
  img_url: string;
  movie_id: number;
  title: string;
  user_id: string;
}
export const useAddFavorite = () => {
  return useMutation({
    mutationFn: async (favoriteData: favoriteDataType) => {
      const { data, error } = await supabase.from('Favorites').insert([favoriteData]);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

// 영화 댓글 삭제
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async ({ movieId, userId }: { movieId: number; userId: string }) => {
      const { data, error } = await supabase.from('Favorites').delete().eq('movie_id', movieId).eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const FavoriteQuery = {
  all: ['favorite'],
};
