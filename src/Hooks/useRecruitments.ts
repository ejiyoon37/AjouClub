// src/Hooks/useRecruitments.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';
import type { Recruitment, ApiRecruitmentDetail, RecruitmentStatus, RecruitmentType } from '../types/recruit'; // (수정)

// (새로 추가) Mock 데이터를 임포트
import { mockRecruitments } from '../mocks/mockRecruitments';

// (새로 추가) API 응답 타입 (목록용)
// (참고) /api/recruitments/main이 빈 배열만 반환하므로, mock 데이터 기준으로 타입을 추정합니다.
interface ApiRecruitmentPost {
  id: number;
  imageUrl: string;
  title: string;
  recruitmentStatus: RecruitmentStatus;
  dDay?: number;
  viewCount: number;
  saveCount: number;
  createdAt: string; 
  isScrappedInitially?: boolean;
}

// (새로 추가) 맵퍼
const mapApiPostToRecruitment = (apiPost: ApiRecruitmentPost): Recruitment => {
  return {
    recruitmentId: apiPost.id,
    clubId: 0, // 목록 API에는 clubId가 없을 수 있음 (추정)
    clubName: '', // 목록 API에는 clubName이 없을 수 있음 (추정)
    title: apiPost.title,
    description: '', // 목록 API에는 없음
    type: '상시모집', // (임시)
    phoneNumber: null,
    email: null,
    startDate: null,
    endDate: null,
    url: null,
    createdAt: apiPost.createdAt,
    images: [apiPost.imageUrl], // 썸네일을 images 배열의 첫 번째로
    status: apiPost.recruitmentStatus,
    dDay: apiPost.dDay || 0,
    isScrapped: apiPost.isScrappedInitially || false,
    scrapCount: apiPost.saveCount,
  };
};

// (새로 추가) /api/recruitments/main API 호출 함수
const getMainRecruitmentPosts = async (): Promise<Recruitment[]> => {
  try {
    const res = await axios.get<ApiResponse<ApiRecruitmentPost[]>>('/api/recruitments/main');
    
    if (res.data.status !== 200) {
      throw new Error(res.data.message);
    }

    // (수정) 1. API가 데이터를 반환하면 (빈 배열이 아니면)
    if (Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data.map(mapApiPostToRecruitment);
    }
    
    // (수정) 2. API가 빈 배열을 반환하면(image_d345a3.png), 임시로 Mock 데이터를 사용
    console.warn('/api/recruitments/main이 빈 데이터를 반환하여 Mock 데이터로 대체합니다.');
    return mockRecruitments.map(mapApiPostToRecruitment as any); // (타입이 다르므로 any 임시 사용)

  } catch (error) {
    console.error('Error fetching main recruitments:', error);
    // (수정) 3. API 호출 실패 시 Mock 데이터로 대체
    console.warn('API 호출 실패. Mock 데이터로 대체합니다.');
    return mockRecruitments.map(mapApiPostToRecruitment as any);
  }
};


// (수정) 훅 본문
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

export default useRecruitments; // (수정) export default 추가