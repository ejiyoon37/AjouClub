// src/types/club.ts

export type ClubType = '중앙동아리' | '소학회';

// 상세 API 응답(JSON[1]) 기준으로 필드 상세화
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
  details: string | null;
  isRecruiting: boolean;
  recruitmentTarget: string | null; 
}

// API 응답
export interface ApiClubData {
  id: number;
  name: string;
  description: string | null;
  clubType: ClubType;
  logoUrl: string | null;
  category: string;
  recruiting: boolean;
  
  // 상세 API에서만 
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