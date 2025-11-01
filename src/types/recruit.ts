// src/types/recruit.ts

// (수정) ApiResponse 타입을 club.ts에서 가져오도록 준비
// (만약 club.ts에 ApiResponse가 없다면, 여기에 추가하세요)
import type { ApiResponse } from './club'; 

export type RecruitmentType = '상시모집' | '수시모집';
export type RecruitmentStatus = 'regular' | 'd-day' | 'end';

// (새로 추가) API 응답: GET /api/recruitments/{id}
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

// (새로 추가) API 응답: GET /api/recruitments/{id}/images
export type ApiRecruitmentImages = string[];

// (수정) 프론트엔드가 사용할 상세 페이지 데이터 표준
export interface Recruitment {
  recruitmentId: number;
  clubId: number;
  clubName: string; // (새로 추가)
  title: string;
  description: string;
  type: RecruitmentType;
  phoneNumber: string | null;
  email: string | null;
  startDate: string | null;
  endDate: string | null;
  url: string | null;
  createdAt: string;

  // (계산됨) UI 표시에 필요한 필드
  images: string[]; // (새로 추가)
  status: RecruitmentStatus;
  dDay: number;

  // (API에 없음) UI 상호작용을 위한 필드
  isScrapped: boolean;
  scrapCount: number; // (참고) 이 필드는 현재 API로 알 수 없습니다.
}