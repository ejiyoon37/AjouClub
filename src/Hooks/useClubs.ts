// src/Hooks/useClubs.ts

import { useQuery } from '@tanstack/react-query'; 
import type { Club, ApiResponse, ApiClubData } from '../types/club'; 
import axios from '../utils/axios'; 

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';
}

// (유지) mapApiClubToClub 함수...
const mapApiClubToClub = (apiClub: ApiClubData): Club => {
  return {
    clubId: apiClub.id,
    clubName: apiClub.name,
    clubType: apiClub.clubType,
    profileImageUrl: apiClub.logoUrl,
    description: apiClub.description,
    category: apiClub.category,
    isRecruiting: apiClub.recruiting,
    mainActivities: null,
    location: null,
    contactPhoneNumber: null,
    instagramUrl: null,
    youtubeUrl: null,
    linktreeUrl: null,
    clubUrl: null,
    contactEmail: null,
    createdAt: '', 
    updatedAt: '',
    details: null,
    recruitmentTarget: apiClub.recruitmentTarget || null,
  };
};

// (수정) API 호출 함수 (모든 필터 파라미터 적용)
const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  // (수정) 'sort'를 제외하고 API 파라미터 매핑
  const { sort, isRecruiting, department, category, type } = filters;
  
  const apiParams: Record<string, any> = {};
  if (type) apiParams.type = type;
  if (category) apiParams.category = category;
  if (department && department !== '전체') apiParams.department = department;
  if (isRecruiting) apiParams.recruiting = true; // API 스펙(image_df65bf.jpg)

  const hasFilters = Object.values(apiParams).some(val => val !== undefined);

  let response;
  if (hasFilters) {
    response = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/filter', {
      params: apiParams, 
    });
  } else {
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