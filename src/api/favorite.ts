import { supabase } from '@/lib/supabaseClient';
import { FavoriteData, FavoriteSearchParams } from '@/types/favorite';

// 영화 즐겨찾기 조회
export const fetchFavorites = () =>
  supabase
    .from('Favorites')
    .select('*')
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });

// 즐겨찾기 추가
export const addFavorite = (favoriteData: FavoriteData) =>
  supabase
    .from('Favorites')
    .insert([favoriteData])
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });

// 즐겨찾기 삭제
export const deleteFavorite = ({ movieId, userId }: FavoriteSearchParams) =>
  supabase
    .from('Favorites')
    .delete()
    .eq('movie_id', movieId)
    .eq('user_id', userId)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });

// 특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회
export const fetchFavoritesByMovie = ({ movieId, userId }: FavoriteSearchParams) =>
  supabase
    .from('Favorites')
    .select('*')
    .eq('movie_id', movieId)
    .eq('user_id', userId)
    .then(({ data, error }) => {
      if (error) throw error;
      return data;
    });
