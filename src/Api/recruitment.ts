// import axios from "axios";

// export interface Recruitment {
//   recruitmentId: number;
//   clubId: number;
//   clubName: string;
//   recruitmentTitle: string;
//   recruitmentType: '상시모집' | '수시모집';
//   recruitmentStartDate: string;
//   recruitmentEndDate: string;
//   profileImageUrl: string;
//   status: '모집중' | '마감임박' | '마감';
// }

// // 모집 공고 리스트 (페이징)
// export const fetchRecruitList = async (
//   page = 1,
//   size = 6
// ): Promise<Recruitment[]> => {
//   const res = await axios.get(`/api/recruitments/list?page=${page}&size=${size}`);
//   return res.data.data;
// };

// // 즐겨찾기 추가
// export const addToFavorites = async (recruitmentId: number): Promise<void> => {
//   try {
//     await axios.post(`/api/recruitments/favorites/${recruitmentId}`);
//   } catch (error) {
//     console.error('즐겨찾기 추가 실패:', error);
//     throw error;
//   }
// };

// // 즐겨찾기 삭제
// export const removeFromFavorites = async (recruitmentId: number): Promise<void> => {
//   try {
//     await axios.delete(`/api/recruitments/favorites/${recruitmentId}`);
//   } catch (error) {
//     console.error('즐겨찾기 삭제 실패:', error);
//     throw error;
//   }
// };

// recruitment.ts
import type { Recruitment } from '../types/recruit';
import { mockRecruitments } from '../mocks/mockRecruitments';
import type { RecruitmentPost } from '../Hooks/useRecruitments';

export const fetchRecruitList = async (
  page = 1,
  size = 6
): Promise<RecruitmentPost[]> => {
  const start = (page - 1) * size;
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecruitments.slice(start, start + size)), 300);
  });
};

export const addToFavorites = async (recruitmentId: number): Promise<void> => {
  console.log(`🟢 mock 즐겨찾기 추가: ${recruitmentId}`);
};

export const removeFromFavorites = async (recruitmentId: number): Promise<void> => {
  console.log(`🔴 mock 즐겨찾기 삭제: ${recruitmentId}`);
};

