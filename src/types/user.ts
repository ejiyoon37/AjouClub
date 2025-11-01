// src/types/user.ts


export interface FavoriteRecruitment {
  clubId: number;
  recruitmentId: number;
  title: string;
  thumbnailUrl: string;
}


export interface UserInfo {
  id: number;
  name: string;
  email: string;
  profilePic: string | null;
}


export interface User extends UserInfo {
  favorites: FavoriteRecruitment[];
}