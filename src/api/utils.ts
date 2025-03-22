import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const withSupabaseHandler = <T>({ data, error }: PostgrestSingleResponse<T>) => {
  if (error) throw error;
  return data;
};
