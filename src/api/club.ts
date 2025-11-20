// src/api/club.ts
import axios from '../utils/axios';

// 동아리 소개 수정 인터페이스
export interface UpdateClubIntroRequest {
  description: string;
  mainActivities: string;
  location: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  linktreeUrl: string | null;
  clubUrl: string | null;
}

// 동아리 소개 수정
export const updateClubIntro = async (
  clubId: number,
  data: UpdateClubIntroRequest
): Promise<void> => {
  await axios.patch(`/api/club/${clubId}`, data);
  console.log(`✏️ API 동아리 소개 수정: clubId=${clubId}`, data);
};

// 동아리 활동 사진 업로드
export const uploadClubActivityImages = async (
  clubId: number,
  files: File[]
): Promise<void> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  
  await axios.post(`/api/club/${clubId}/activity-images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(`📷 API 동아리 활동 사진 업로드: clubId=${clubId}, 파일 수=${files.length}`);
};

// 동아리 활동 사진 삭제
export const deleteClubActivityImage = async (
  clubId: number,
  imageUrl: string
): Promise<void> => {
  await axios.delete(`/api/club/${clubId}/activity-images/one`, {
    params: { url: imageUrl },
  });
  console.log(`🗑️ API 동아리 활동 사진 삭제: clubId=${clubId}, url=${imageUrl}`);
};