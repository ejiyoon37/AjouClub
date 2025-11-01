// src/Hooks/useClubs.ts

import { useQuery } from '@tanstack/react-query';
import type { Club, ApiResponse, ApiClubData, ClubType } from '../types/club';
import axios from '../utils/axios'; 

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';

}


const mapApiClubToClub = (apiClub: ApiClubData): Club => {
  return {
    clubId: apiClub.id,
    clubName: apiClub.name,
    clubType: apiClub.clubType,
    profileImageUrl: apiClub.logoUrl,
    description: apiClub.description,
    category: apiClub.category,
    isRecruiting: apiClub.recruiting,

  };
};


const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  const useAllEndpoint = Object.keys(filters).length === 0;
  
  // 1. /api/club/all 호출 (필터가 없을 때)
  if (useAllEndpoint) {
    const res = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/all');
    if (res.data.status !== 200) throw new Error(res.data.message);
    return res.data.data.map(mapApiClubToClub);
  }

  // 2. /api/club/filter 호출 (필터가 있을 때)
  const res = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/filter', {
    params: {
      type: filters.type,
      category: filters.category,
      isRecruiting: filters.isRecruiting,
      department: filters.department,
      sort: filters.sort,
    },
  });
  if (res.data.status !== 200) throw new Error(res.data.message);
  return res.data.data.map(mapApiClubToClub);
};


const useClubs = (filters: ClubFilterParams = {}) => {
  const { 
    data: clubs = [], // data가 undefined일 때 빈 배열([])을 기본값으로 사용
    isLoading, 
    error 
  } = useQuery<Club[], Error>({
    queryKey: ['clubs', filters], 
    queryFn: () => fetchClubs(filters),
  });

  return { clubs, isLoading, error };
};

export default useClubs;