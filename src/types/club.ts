// src/types/club.ts

export type ClubType = '중앙동아리' | '소학회' | '기타';


export interface Club {
  clubId: number;
  name: string;
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
}

// ApiResponse
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

//  API 응답 원본 데이터 타입 (useClubs.ts용)
export interface ApiClubData {
  id: number;
  name: string;
  description: string | null;
  clubType: string; 
  logoUrl: string | null;
  category: string; 
  recruiting: boolean;
  
  // 상세 API에서만 오는 필드들 (목록 API에도 포함될 수 있음)
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