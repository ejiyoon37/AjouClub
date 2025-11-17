// src/Hooks/useClubs.ts

import { useQuery } from '@tanstack/react-query'; 
import type { Club, ApiResponse, ApiClubData , ClubType } from '../types/club'; 
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
    clubType: apiClub.clubType as ClubType,
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
    //recruitmentTarget: apiClub.recruitmentTarget || null,
  };
};


const fetchClubs = async (filters: ClubFilterParams): Promise<Club[]> => {
  
  //const { sort, isRecruiting, department, category, type } = filters;
  const { isRecruiting, department, category, type } = filters;
  const apiParams: Record<string, any> = {};
  if (type) apiParams.type = type;
  if (category) apiParams.category = category;
  if (department && department !== '전체') apiParams.department = department;
  if (isRecruiting) apiParams.status = 'RECRUITING'
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
  
  const { sort, ...realFilters } = filters;
  
  const { 
    data: clubs = [], 
    isLoading, 
    error 
  } = useQuery<Club[], Error>({
    
    queryKey: ['clubs', realFilters], 

    queryFn: () => fetchClubs(realFilters),
  });

  return { clubs, isLoading, error };
};

export default useClubs;