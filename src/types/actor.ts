// 크레딧 정보
export interface MovieCredit {
  id: number;
  cast: {
    adult: boolean;
    gender: number; // 0: unspecified, 1: female, 2: male
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[];
}
