// src/types/club.ts

export type ClubType = '중앙동아리' | '소학회';

export interface Club {
  clubId: number;
  clubName: string;
  clubType: ClubType;
  profileImageUrl: string | null; // API의 logoUrl. null일 수 있음
  description?: string | null;
  category: string; 
  isRecruiting: boolean; 


  contact?: {
    instagramUrl?: string;
    homepageUrl?: string;
  };
}

export interface ClubPreview {
  id: number; // = clubId
  name: string;
  type: ClubType;
  description: string;
  imageUrl: string;
  isScrappedInitially?: boolean;
}


export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
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