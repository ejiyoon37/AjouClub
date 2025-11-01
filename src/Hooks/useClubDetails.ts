// src/Hooks/useClubDetails.ts

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios'; // lib/axios 대신 utils/axios 사용
import type { Club, ApiResponse } from '../types/club';

// API 응답 데이터를 Club 타입으로 매핑 (필드 이름 맞추기)
const mapApiDataToClub = (data: any): Club => {
  return {
    ...data,
    clubId: data.id,
    clubName: data.name,
    profileImageUrl: data.logoUrl, // logoUrl -> profileImageUrl
    isRecruiting: data.recruiting,
  };
};

const fetchClubDetail = async (clubId: number): Promise<Club> => {
  try {
    // 1. 중앙동아리 API(/api/club/central/{clubId}) [user-provided-json] 먼저 시도
    const res = await axios.get<ApiResponse<any>>(`/api/club/central/${clubId}`);
    if (res.data.status === 200) {
      return mapApiDataToClub(res.data.data);
    }
  } catch (error: any) {
    // 2. 404 에러가 발생하면 소학회 API(/api/club/academic/{clubId}) [user-provided-json] 시도
    if (error.response && error.response.status === 404) {
      try {
        const res = await axios.get<ApiResponse<any>>(`/api/club/academic/${clubId}`);
        if (res.data.status === 200) {
          return mapApiDataToClub(res.data.data);
        }
      } catch (academicError) {
        console.error('Academic club fetch failed:', academicError);
        throw academicError; // 소학회도 실패하면 에러
      }
    }
    // 404가 아닌 다른 에러
    console.error('Central club fetch failed:', error);
    throw error;
  }
  // 200이 아닌 응답
  throw new Error('Failed to fetch club details');
};

export const useClubDetail = (clubId: number): UseQueryResult<Club, Error> => {
  return useQuery<Club, Error>({
    queryKey: ['clubDetail', clubId],
    queryFn: () => fetchClubDetail(clubId),
    enabled: !!clubId,
    retry: false, // 훅 내부에서 이미 재시도(central -> academic) 로직이 있으므로 React Query 재시도 비활성화
  });
};