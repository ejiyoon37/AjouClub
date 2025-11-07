// src/Hooks/useClubActivityImages.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';


interface ApiActivityImage {
  id: number;
  clubId: number;
  imageUrl: string;
}
/* 동아리 활동사진 (GET /api/club/{clubId}/activity-images) -clubId 이용 */
const fetchImagesAtUrl = async (url: string): Promise<string[] | null> => {
  try {
    const res = await axios.get<ApiResponse<ApiActivityImage[]>>(url);
    if (res.data.status === 200 && Array.isArray(res.data.data)) {      
      return res.data.data.map(image => image.imageUrl);
    }

    // 200 응답이지만 데이터가 배열이 아닌 경우 - 비어있는 배열로 처리
    console.warn('Activity images data is not an array:', res.data.data);
    return []; 
  } catch (error: any) {
    // 404 발생 시 null 반환 
    if (error.response && error.response.status === 404) {
      return null; 
    }
    // 404가 아닌 에러-React Query
    console.error('Error fetching activity images:', error);
    throw error; 
  }
};

// clubId를 받아 중앙/소학회 API를 순차적으로 호출하는 함수
const fetchClubActivityImages = async (clubId: number): Promise<string[]> => {
  try {
    let images = await fetchImagesAtUrl(`/api/club/central/${clubId}/activity-images`);

    if (images === null) {
      images = await fetchImagesAtUrl(`/api/club/academic/${clubId}/activity-images`);
    }

    return images || [];

  } catch (error: any) {
    console.error(`Failed to fetch activity images for club ${clubId}:`, error);
    return []; 
  }
};

// 메인 훅
export const useClubActivityImages = (clubId: number): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>({
    queryKey: ['clubActivityImages', clubId],
    queryFn: () => fetchClubActivityImages(clubId), 
    enabled: !!clubId,
    // 404 재시도를 훅 내부에서 수동으로 처리중이니까 false
    retry: false, 
  });
};