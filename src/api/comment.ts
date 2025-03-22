import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';
import { withSupabaseHandler } from '@/api/utils';

/**  영화 댓글 조회  */
export const fetchComments = (movieId: number) =>
  supabase.from('Comments').select('*').eq('movie_id', movieId).then(withSupabaseHandler);

/** 영화 댓글 추가 */
export const addComment = (commentData: Comment) =>
  supabase.from('Comments').insert([commentData]).then(withSupabaseHandler);

/**  영화 댓글 삭제  */
export const deleteComment = ({ movieId, userId }: DeleteCommentParams) =>
  supabase.from('Comments').delete().eq('movie_id', movieId).eq('user_id', userId).then(withSupabaseHandler);
