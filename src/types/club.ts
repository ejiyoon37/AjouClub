// src/types/club.ts

export type ClubType = '중앙동아리' | '소학회';

// (수정) 상세 정보 필드들을 선택적(optional '?')으로 변경
export interface Club {
  clubId: number;
  clubName: string;
  description: string | null;
  mainActivities?: string | null; 
  location?: string | null; 
  contactPhoneNumber?: string | null; 
  instagramUrl?: string | null;
  youtubeUrl?: string | null; 
  linktreeUrl?: string | null; 
  clubUrl?: string | null; 
  contactEmail?: string | null; 
  createdAt?: string;
  updatedAt?: string; 
  clubType: ClubType;
  profileImageUrl: string | null; 
  category: string;
  details?: string | null; 
  isRecruiting: boolean;
}

export interface ApiClubData {
  id: number;
  name: string;
  description: string | null;
  clubType: ClubType;
  logoUrl: string | null;
  category: string;
  recruiting: boolean;
}


export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}


export interface ClubPreview {
  id: number;
  name: string;
  type: ClubType;
  description: string;
  imageUrl: string;
  isScrappedInitially?: boolean;
}