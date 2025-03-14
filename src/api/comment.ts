import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';

/**  영화 댓글 조회  */
export const fetchComments = async (movieId: number) => {
  const { data } = await supabase.from('Comments').select('*').eq('movie_id', movieId);

  return data;
};

/** 영화 댓글 추가 */
export const addComment = async (commentData: Comment) => {
  const { data, error } = await supabase.from('Comments').insert([commentData]);

  if (error) throw new Error(error.message);
  return data;
};

/**  영화 댓글 삭제  */
export const deleteComment = async ({ movieId, userId }: DeleteCommentParams) => {
  const { data, error } = await supabase.from('Comments').delete().eq('movie_id', movieId).eq('user_id', userId);

  if (error) throw new Error(error.message);
  return data;
};
