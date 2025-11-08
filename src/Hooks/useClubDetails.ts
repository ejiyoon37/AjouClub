// src/Hooks/useClubDetails.ts

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios'; 
import type { Club, ApiResponse, ApiClubData , ClubType } from '../types/club'; 


const mapApiDataToClub = (data: ApiClubData): Club => {
  return {
    clubId: data.id,
    clubName: data.name,
    description: data.description,
    mainActivities: data.mainActivities || null,
    location: data.location || null,
    contactPhoneNumber: data.contactPhoneNumber || null,
    instagramUrl: data.instagramUrl || null,
    youtubeUrl: data.youtubeUrl || null,
    linktreeUrl: data.linktreeUrl || null,
    clubUrl: data.clubUrl || null,
    contactEmail: data.contactEmail || null,
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
    clubType: data.clubType as ClubType,
    profileImageUrl: data.logoUrl,
    category: data.category,
    details: data.details || null, 
    isRecruiting: data.recruiting,
    //recruitmentTarget: data.recruitmentTarget || null, 
  };
};

const fetchClubDetail = async (clubId: number): Promise<Club> => {
  try {
    // 1. 중앙동아리 API(/api/club/central/{clubId})
    const res = await axios.get<ApiResponse<ApiClubData>>(`/api/club/central/${clubId}`);
    if (res.data.status === 200) {
      return mapApiDataToClub(res.data.data);
    }
  } catch (error: any) {
    // 2. 404 에러가 발생하면 소학회 API(/api/club/academic/{clubId}) 시도
    if (error.response && error.response.status === 404) {
      try {
        const res = await axios.get<ApiResponse<ApiClubData>>(`/api/club/academic/${clubId}`);
        if (res.data.status === 200) {
          return mapApiDataToClub(res.data.data);
        }
      } catch (academicError) {
        console.error('Academic club fetch failed:', academicError);
        throw academicError; 
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
    retry: false, 
  });
};