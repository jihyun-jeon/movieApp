import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';

// 영화 댓글 조회
export const useGetCommentsQuery = (movieId: number) =>
  useQuery({
    queryFn: async () => await supabase.from('Comments').select('*').eq('movie_id', movieId),
    queryKey: CommnetQuery.getMany(movieId),
  });

// 영화 댓글 추가
export const useAddComment = () =>
  useMutation({
    mutationFn: async (commentData: Comment) => {
      const { data, error } = await supabase.from('Comments').insert([commentData]);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

// 영화 댓글 삭제
export const useDeleteComment = () =>
  useMutation({
    mutationFn: async ({ movieId, userId }: DeleteCommentParams) => {
      const { data, error } = await supabase.from('Comments').delete().eq('movie_id', movieId).eq('user_id', userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

export const CommnetQuery = {
  all: ['comment'],
  getMany: (movieId: number) => [...CommnetQuery.all, 'getMany', movieId],
};
