// src/Api/recruitment.ts
import type { Recruitment } from '../types/recruit';
import axios from '../utils/axios'; // (새로 추가)

// (삭제) mockRecruitments 및 RecruitmentPost
// (삭제) fetchRecruitList (useRecruitments.ts로 이동)

// (수정) mock 대신 실제 API 호출
export const addToFavorites = async (recruitmentId: number): Promise<void> => {
  await axios.post(`/api/recruitments/favorites/${recruitmentId}`);
  console.log(`🟢 API 즐겨찾기 추가: ${recruitmentId}`);
};

// (수정) mock 대신 실제 API 호출
export const removeFromFavorites = async (recruitmentId: number): Promise<void> => {
  await axios.delete(`/api/recruitments/favorites/${recruitmentId}`);
  console.log(`🔴 API 즐겨찾기 삭제: ${recruitmentId}`);
};