import { useMutation, useQuery } from '@tanstack/react-query';
import { addComment, deleteComment, fetchComments } from '@/api/comment';

/**  영화 댓글 조회  */
export const useGetCommentsQuery = (movieId: number) =>
  useQuery({
    queryFn: () => fetchComments(movieId),
    queryKey: CommentQueryKey.getMany(movieId),
  });

/** 영화 댓글 추가 */
export const useAddComment = () =>
  useMutation({
    mutationFn: addComment,
  });

/**  영화 댓글 삭제  */
export const useDeleteComment = () =>
  useMutation({
    mutationFn: deleteComment,
  });

export const CommentQueryKey = {
  all: ['comment'],
  getMany: (movieId: number) => [...CommentQueryKey.all, 'getMany', movieId],
};
