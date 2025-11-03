// src/Hooks/useRecruitments.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';
// RecruitmentStatus 타입을 가져옵니다.
import type { Recruitment, RecruitmentStatus } from '../types/recruit'; 

//  Mock 데이터를 임포트
import { mockRecruitments } from '../mocks/mockRecruitments';

// API 응답 타입 (목록용)
interface ApiRecruitmentPost {
  id: number;
  clubId: number; 
  imageUrl: string;
  title: string;
  recruitmentStatus: RecruitmentStatus;
  dDay?: number;
  viewCount: number;
  saveCount: number;
  createdAt: string; 
  isScrappedInitially?: boolean;
}

//  맵퍼
const mapApiPostToRecruitment = (apiPost: ApiRecruitmentPost): Recruitment => {
  return {
    recruitmentId: apiPost.id,
    clubId: apiPost.clubId,
    clubName: '', 
    title: apiPost.title,
    description: '', 
    type: '상시모집', 
    phoneNumber: null,
    email: null,
    startDate: null,
    endDate: null,
    url: null,
    createdAt: apiPost.createdAt,
    images: [apiPost.imageUrl], 
    status: apiPost.recruitmentStatus,
    dDay: apiPost.dDay || 0,
    viewCount: apiPost.viewCount, 
    isScrapped: apiPost.isScrappedInitially || false,
    scrapCount: apiPost.saveCount,
  };
};

//  /api/recruitments/main API 호출 함수
const getMainRecruitmentPosts = async (): Promise<Recruitment[]> => {
  try {
    const res = await axios.get<ApiResponse<ApiRecruitmentPost[]>>('/api/recruitments/main');
    
    if (res.data.status !== 200) {
      throw new Error(res.data.message);
    }

    if (Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data.map(mapApiPostToRecruitment);
    }
    
    console.warn('/api/recruitments/main이 빈 데이터를 반환하여 Mock 데이터로 대체합니다.');
   
    return mockRecruitments.map(mapApiPostToRecruitment); 

  } catch (error) {
    console.error('Error fetching main recruitments:', error);
    console.warn('API 호출 실패. Mock 데이터로 대체합니다.');
    return mockRecruitments.map(mapApiPostToRecruitment); 
  }
};


// 훅 본문
const useRecruitments = () => {
  const { 
    data: posts = [], 
    isLoading, 
    error 
  } = useQuery<Recruitment[], Error>({
    queryKey: ['mainRecruitments'],
    queryFn: getMainRecruitmentPosts,
  });

  return { posts, isLoading, error };
};

export default useRecruitments; 