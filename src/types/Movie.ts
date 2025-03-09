// 영화 리스트
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// 장르
export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

// 영화 세부정보
export interface MovieDetail {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  runtime: number;
  overview: string;
  release_date: string;
  video: boolean;
}

// 쿼리 파라미터
export interface baseSearchParam {
  language: string;
  page?: number;
}

export interface genreSearchParam extends baseSearchParam {
  with_genres?: string;
}

export interface keywordSearchParam extends baseSearchParam {
  query?: string;
}
