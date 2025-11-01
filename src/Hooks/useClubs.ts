// src/Hooks/useClubs.ts

import { useQuery } from '@tanstack/react-query'; // (수정)
import type { Club, ApiResponse, ApiClubData } from '../types/club'; // (수D)
import axios from '../utils/axios'; // (수정)

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';
}

// (새로 추가) API 응답 [user-provided-json-with-data]을 프론트엔드 Club 타입으로 변환
const mapApiClubToClub = (apiClub: ApiClubData): Club => {
  return {
    clubId: apiClub.id,
    clubName: apiClub.name,
    clubType: apiClub.clubType,
    profileImageUrl: apiClub.logoUrl,
    description: apiClub.description,
    category: apiClub.category,
    isRecruiting: apiClub.recruiting,
    
    // (참고) 상세 정보 필드들은 /all, /filter API에 없으므로 null/undefined로 둡니다.
    mainActivities: null,
    location: null,
    contactPhoneNumber: null,
    instagramUrl: null,
    youtubeUrl: null,
    linktreeUrl: null,
    clubUrl: null,
    contactEmail: null,
    createdAt: '', // createdAt 등은 /all API에 없으므로 기본값 처리
    updatedAt: '',
    details: null,
  };
};

// (수정) API 호출 함수 (sort 파라미터 제외)
const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  // (수정) 'sort'를 제외한 실제 필터만 사용
  const { sort, ...realFilters } = filters;
  const hasFilters = Object.values(realFilters).some(val => val !== undefined);

  let response;
  if (hasFilters) {
    // (수정) params: realFilters (sort 제외)
    response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/filter', {
      params: realFilters, 
    });
  } else {
    // 필터가 없으면 /api/club/all [user-provided-json, user-provided-json-with-data] 호출
    response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/all');
  }

  if (response.data.status !== 200) {
    throw new Error(response.data.message || 'Failed to fetch clubs');
  }

  return response.data.data.map(mapApiClubToClub);
};


const useClubs = (filters: ClubFilterParams = {}) => {
  // (수정) queryKey에서 sort 분리
  const { sort, ...realFilters } = filters;
  
  const { 
    data: clubs = [], 
    isLoading, 
    error 
  } = useQuery<Club[], Error>({
    // (수정) queryKey에 realFilters만 포함
    queryKey: ['clubs', realFilters], 
    // (수정) queryFn에 realFilters만 전달
    queryFn: () => fetchClubs(realFilters),
  });

  return { clubs, isLoading, error };
};

export default useClubs;