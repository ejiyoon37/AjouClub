// src/Api/club.ts

import type { Club, ApiResponse, ApiClubData } from '../types/club';
import axios from '../utils/axios'; 


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


export const fetchAllClubs = async (): Promise<Club[]> => {
  try {
    const res = await axios.get<ApiResponse<ApiClubData[]>>('/api/club/all');
    if (res.data.status !== 200) {
      console.error('Error fetching all clubs:', res.data.message);
      return []; // 에러 시 빈 배열 반환
    }
    return res.data.data.map(mapApiClubToClub);
  } catch (error) {
    console.error('Network error fetching all clubs:', error);
    return []; // 에러 시 빈 배열 반환
  }
};