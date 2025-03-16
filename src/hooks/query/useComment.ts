import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, fetchComments } from '@/api/comment';

/**  영화 댓글 조회  */
export const useGetCommentsQuery = (movieId: number) =>
  useQuery({
    queryFn: () => fetchComments(movieId),
    queryKey: CommentQueryKey.getMany(movieId),
  });

/** 영화 댓글 추가 */
export const useAddComment = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.getMany(movieId) });
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

/**  영화 댓글 삭제  */
export const useDeleteComment = (movieId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.getMany(movieId) });
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export const CommentQueryKey = {
  all: ['comment'],
  getMany: (movieId: number) => [...CommentQueryKey.all, 'getMany', movieId],
};
