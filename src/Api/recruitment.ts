// src/api/recruitment.ts
//import type { Recruitment } from '../types/recruit';
import axios from '../utils/axios'; 


export const addToFavorites = async (recruitmentId: number): Promise<void> => {
  await axios.post(`/api/recruitments/favorites/${recruitmentId}`);
  console.log(`🟢 API 즐겨찾기 추가: ${recruitmentId}`);
};


export const removeFromFavorites = async (recruitmentId: number): Promise<void> => {
  await axios.delete(`/api/recruitments/favorites/${recruitmentId}`);
  console.log(`🔴 API 즐겨찾기 삭제: ${recruitmentId}`);
};