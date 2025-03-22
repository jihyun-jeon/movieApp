import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';

/**  영화 댓글 조회  */
export const fetchComments = (movieId: number) =>
  supabase
    .from('Comments')
    .select('*')
    .eq('movie_id', movieId)
    .then((res) => res.data);

/** 영화 댓글 추가 */
export const addComment = (commentData: Comment) =>
  supabase
    .from('Comments')
    .insert([commentData])
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });

/**  영화 댓글 삭제  */
export const deleteComment = ({ movieId, userId }: DeleteCommentParams) =>
  supabase
    .from('Comments')
    .delete()
    .eq('movie_id', movieId)
    .eq('user_id', userId)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
