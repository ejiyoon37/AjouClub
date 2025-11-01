// src/Api/club.ts

import type { Club, ApiResponse, ApiClubData } from '../types/club';
import axios from '../utils/axios'; 

// (수정) Club 타입의 모든 필드를 명시적으로 반환
const mapApiClubToClub = (apiClub: ApiClubData): Club => {
  return {
    // ApiClubData에서 오는 필드
    clubId: apiClub.id,
    clubName: apiClub.name,
    clubType: apiClub.clubType,
    profileImageUrl: apiClub.logoUrl,
    description: apiClub.description,
    category: apiClub.category,
    isRecruiting: apiClub.recruiting,

    // (추가) 상세 정보 필드 (목록 API에 없으므로 null 또는 undefined 처리)
    mainActivities: null,
    location: null,
    contactPhoneNumber: null,
    instagramUrl: null,
    youtubeUrl: null,
    linktreeUrl: null,
    clubUrl: null,
    contactEmail: null,
    createdAt: undefined,
    updatedAt: undefined,
    details: null,
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