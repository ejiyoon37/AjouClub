// src/types/club.ts

export type ClubType = '중앙동아리' | '소학회';

// (수정) 상세 API 응답(JSON[1]) 기준으로 필드 상세화
export interface Club {
  clubId: number;
  clubName: string;
  description: string | null;
  mainActivities: string | null; 
  location: string | null; 
  contactPhoneNumber: string | null; 
  instagramUrl: string | null;
  youtubeUrl: string | null; 
  linktreeUrl: string | null; 
  clubUrl: string | null; 
  contactEmail: string | null; 
  createdAt: string;
  updatedAt: string; 
  clubType: ClubType;
  profileImageUrl: string | null; 
  category: string;
  details: string | null; // '분과' 필드
  isRecruiting: boolean;
  recruitmentTarget: string | null; // '모집 대상' 필드
}

// (수정) API 응답의 data 필드 타입
export interface ApiClubData {
  id: number;
  name: string;
  description: string | null;
  clubType: ClubType;
  logoUrl: string | null;
  category: string;
  recruiting: boolean;
  
  // (추가) 상세 API에서만 오는 필드들
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
  details?: string | null; 
  recruitmentTarget?: string | null;
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