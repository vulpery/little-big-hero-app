export interface User {
  username: string;
  email: string;
  avatar_image: string;
  wallet_address: string;
  experience_points: number;
  level: number;
  created_at?: string;
  updated_at?: string;
}
