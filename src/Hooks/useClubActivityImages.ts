// src/Hooks/useClubActivityImages.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';

/**
 * clubId로 동아리 활동 사진 목록(string[])
 * (GET /api/club/{clubId}/activity-images)
 */
const fetchClubActivityImages = async (clubId: number): Promise<string[]> => {
  try {
    const res = await axios.get<ApiResponse<string[]>>(`/api/club/${clubId}/activity-images`);
    if (res.data.status === 200 && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    // 200 응답이지만 데이터가 배열이 아닌 경우
    console.warn('Activity images data is not an array:', res.data.data);
    return [];
  } catch (error: any) {
    // 404 (사진 없음) 등 에러 발생 시 빈 배열 반환
    if (error.response?.status !== 404) {
      console.error('Error fetching activity images:', error);
    }
    return []; 
  }
};

export const useClubActivityImages = (clubId: number): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>({
    queryKey: ['clubActivityImages', clubId],
    queryFn: () => fetchClubActivityImages(clubId),
    enabled: !!clubId,
  });
};