import { supabase } from '@/lib/supabaseClient';
import { FavoriteData, FavoriteSearchParams } from '@/types/favorite';
import { withSupabaseHandler } from '@/api/utils';

// 영화 즐겨찾기 조회
export const fetchFavorites = () => supabase.from('Favorites').select('*').then(withSupabaseHandler);

// 즐겨찾기 추가
export const addFavorite = (favoriteData: FavoriteData) =>
  supabase.from('Favorites').insert([favoriteData]).then(withSupabaseHandler);

// 즐겨찾기 삭제
export const deleteFavorite = ({ movieId, userId }: FavoriteSearchParams) =>
  supabase.from('Favorites').delete().eq('movie_id', movieId).eq('user_id', userId).then(withSupabaseHandler);

// 특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회
export const fetchFavoritesByMovie = ({ movieId, userId }: FavoriteSearchParams) =>
  supabase.from('Favorites').select('*').eq('movie_id', movieId).eq('user_id', userId).then(withSupabaseHandler);
