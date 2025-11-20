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

export const deleteRecruitment = async (recruitmentId: number): Promise<void> => {
  await axios.delete(`/api/recruitments/${recruitmentId}`);
  console.log(`🗑️ API 공고 삭제: ${recruitmentId}`);
};

// 모집공고 생성 인터페이스
export interface CreateRecruitmentRequest {
  title: string;
  description: string;
  type: '상시모집' | '수시모집';
  phoneNumber: string | null;
  email: string | null;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string | null; // YYYY-MM-DD 형식 (상시모집일 경우 null 가능)
  url: string;
}

export const createRecruitment = async (
  clubId: number,
  data: CreateRecruitmentRequest
): Promise<number> => {
  const res = await axios.post<{ id: number }>(`/api/recruitments/${clubId}`, data);
  console.log(`✅ API 모집공고 생성: clubId=${clubId}`, data);
  return res.data.id; // 생성된 모집공고 ID 반환
};

// 모집공고 수정 인터페이스 (생성과 동일)
export interface UpdateRecruitmentRequest {
  title: string;
  description: string;
  type: '상시모집' | '수시모집';
  phoneNumber: string | null;
  email: string | null;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string | null; // YYYY-MM-DD 형식 (상시모집일 경우 null 가능)
  url: string;
}

export const updateRecruitment = async (
  recruitmentId: number,
  data: UpdateRecruitmentRequest
): Promise<void> => {
  await axios.patch(`/api/recruitments/${recruitmentId}`, data);
  console.log(`✏️ API 모집공고 수정: recruitmentId=${recruitmentId}`, data);
};

// 모집공고 이미지 업로드
export const uploadRecruitmentImage = async (
  recruitmentId: number,
  imageFile: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  await axios.post(`/api/recruitments/${recruitmentId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(`📷 API 모집공고 이미지 업로드: recruitmentId=${recruitmentId}`);
};

// 모집공고 이미지 교체 (기존 이미지를 새 파일로 교체)
export const replaceRecruitmentImage = async (
  recruitmentId: number,
  oldUrl: string,
  imageFile: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('file', imageFile);
  
  await axios.post(`/api/recruitments/${recruitmentId}/images/by-url?oldUrl=${encodeURIComponent(oldUrl)}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(`🔄 API 모집공고 이미지 교체: recruitmentId=${recruitmentId}, oldUrl=${oldUrl}`);
};