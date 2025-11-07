// src/types/recruit.ts

//import type { ApiResponse } from './club'; 

export type RecruitmentType = '상시모집' | '수시모집';
export type RecruitmentStatus = 'regular' | 'd-day' | 'end';


export interface ApiRecruitmentDetail {
  id: number;
  clubId: number;
  clubName: string;
  title: string;
  description: string;
  type: RecruitmentType;
  phoneNumber: string | null;
  email: string | null;
  startDate: string | null; // "YYYY-MM-DD"
  endDate: string | null; // "YYYY-MM-DD"
  url: string | null;
  createdAt: string; // "YYYY-MM-DDTHH:mm:ss"
  updatedAt: string;
}


export type ApiRecruitmentImages = string[];


export interface Recruitment {
  recruitmentId: number;
  clubId: number;
  clubName: string; 
  title: string;
  description: string;
  type: RecruitmentType;
  phoneNumber: string | null;
  email: string | null;
  startDate: string | null;
  endDate: string | null;
  url: string | null;
  createdAt: string;


  images: string[]; 
  status: RecruitmentStatus;
  dDay: number;
  viewCount?: number;
  isScrapped: boolean;
  scrapCount: number; 
}