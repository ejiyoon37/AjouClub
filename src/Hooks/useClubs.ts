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

// (새로 추가) API 호출 함수
const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  // 'sort'를 제외한 실제 필터가 있는지 확인
  const { sort, ...realFilters } = filters;
  const hasFilters = Object.values(realFilters).some(val => val !== undefined);

  let response;
  if (hasFilters) {
    // 필터가 있으면 /api/club/filter [user-provided-json] 호출
    response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/filter', {
      params: filters, // sort 파라미터 포함하여 전송 (서버에서 무시하더라도)
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
  // (수정) useState/useEffect 훅을 React Query의 useQuery로 교체
  const { 
    data: clubs = [], 
    isLoading, 
    error 
  } = useQuery<Club[], Error>({
    // queryKey에 filters를 포함시켜 필터가 변경될 때마다 데이터를 다시 불러옵니다.
    queryKey: ['clubs', filters], 
    queryFn: () => fetchClubs(filters),
  });

  return { clubs, isLoading, error };
};

export default useClubs;