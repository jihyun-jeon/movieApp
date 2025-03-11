export interface Comment {
  movie_id: number;
  review: string;
  user_id: string;
  user_name: string;
  vote: number;
}

export type DeleteCommentParams = { movieId: number; userId: string };
