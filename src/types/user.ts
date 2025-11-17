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
  // JWT에서 추출할 정보  (관리자 관련)
  roles: string[]; 
  managedClubIds: number[]; 
}

export interface ManagedClub {
  clubId: number;
  clubName: string;
  logoUrl: string | null;
}

export interface User extends UserInfo {
  favorites: FavoriteRecruitment[];
}