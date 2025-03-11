import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';

// 영화 댓글 조회
export const useGetComments = (movieId: number) => {
  return useQuery({
    queryFn: async () => {
      return await supabase.from('Comments').select('*').eq('movie_id', movieId);
    },
    queryKey: CommnetQuery.getMany(movieId),
  });
};

// 영화 댓글 추가
export const useAddComment = () => {
  return useMutation({
    mutationFn: async (commentData: Comment) => {
      const { data, error } = await supabase.from('Comments').insert([commentData]);

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
    mutationFn: async ({ movieId, userId }: DeleteCommentParams) => {
      const { data, error } = await supabase.from('Comments').delete().eq('movie_id', movieId).eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const CommnetQuery = {
  all: ['comment'],
  getMany: (movieId: number) => [...CommnetQuery.all, 'getMany', movieId],
};
