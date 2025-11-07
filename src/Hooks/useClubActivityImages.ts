// src/Hooks/useClubActivityImages.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';


interface ApiActivityImage {
  id: number;
  clubId: number;
  imageUrl: string;
}

/*(GET /api/club/{clubId}/activity-images) */
const fetchClubActivityImages = async (clubId: number): Promise<string[]> => {
  try {
    const res = await axios.get<ApiResponse<ApiActivityImage[]>>(
      `/api/club/${clubId}/activity-images`
    );

    if (res.data.status === 200 && Array.isArray(res.data.data)) {
      return res.data.data.map((image) => image.imageUrl);
    }
    console.warn('Activity images data is not an array:', res.data.data);
    return [];
    
  } catch (error: any) {
    if (error.response?.status !== 404) {
      console.error('Error fetching activity images:', error);
    }
    return [];
  }
};

// 메인 훅
export const useClubActivityImages = (
  clubId: number
): UseQueryResult<string[], Error> => {
  return useQuery<string[], Error>({
    queryKey: ['clubActivityImages', clubId],
    queryFn: () => fetchClubActivityImages(clubId),
    enabled: !!clubId,
  });
};