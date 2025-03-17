import { supabase } from '@/lib/supabaseClient';
import { FavoriteData, FavoriteSearchParams } from '@/types/favorite';

// 영화 즐겨찾기 조회
export const fetchFavorites = async () => {
  const { data, error } = await supabase.from('Favorites').select('*');
  if (error) throw error;
  return data;
};

// 즐겨찾기 추가
export const addFavorite = async (favoriteData: FavoriteData) => {
  const { data, error } = await supabase.from('Favorites').insert([favoriteData]);

  if (error) throw error;
  return data;
};

// 즐겨찾기 삭제
export const deleteFavorite = async ({ movieId, userId }: FavoriteSearchParams) => {
  const { data, error } = await supabase.from('Favorites').delete().eq('movie_id', movieId).eq('user_id', userId);

  if (error) throw error;
  return data;
};

// 특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회
export const fetchFavoritesByMovie = async ({ movieId, userId }: FavoriteSearchParams) => {
  const { data, error } = await supabase.from('Favorites').select('*').eq('movie_id', movieId).eq('user_id', userId);

  if (error) throw error;
  return data;
};
