// src/Hooks/useRecruitments.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club';
import type { 
  Recruitment, 
  RecruitmentStatus, 
  RecruitmentType, 
  ApiRecruitmentDetail 
} from '../types/recruit'; 


// D-day 계산
const calculateDDay = (endDate: string | null): number => {
  if (!endDate) return 0;
  const today = new Date();
  const end = new Date(endDate);
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
};

// '상시모집', 날짜를 기준으로 status 계산
const calculateStatus = (
  type: RecruitmentType,
  endDate: string | null
): RecruitmentStatus => {
  if (type === '상시모집') return 'regular';

  if (!endDate) return 'regular'; // 종료일 없으면 상시모집 취급

  const dDay = calculateDDay(endDate);
  
  if (dDay === 0) return 'end';
  if (dDay <= 7) return 'd-day'; // 7일 이내면 마감임박
  return 'regular'; // 그 외에는 모집중 (regular)
};
// --- 헬퍼 끝 ---


// 맵퍼 함수:
const mapApiDetailToRecruitment = (apiPost: ApiRecruitmentDetail): Recruitment => {
  const status = calculateStatus(apiPost.type, apiPost.endDate);
  const dDay = calculateDDay(apiPost.endDate);

  return {
    recruitmentId: apiPost.id,
    clubId: apiPost.clubId,
    clubName: apiPost.clubName, 
    title: apiPost.title,
    description: apiPost.description, 
    type: apiPost.type, 
    phoneNumber: apiPost.phoneNumber,
    email: apiPost.email,
    startDate: apiPost.startDate,
    endDate: apiPost.endDate,
    url: apiPost.url,
    createdAt: apiPost.createdAt,
    
  
    images: [], // '/api/recruitments'는 목록 이미지를 제공하지 않음
    status: status, // 계산된 값
    dDay: dDay, // 계산된 값
    viewCount: 0, // '/api/recruitments'는 viewCount를 제공하지 않음
    isScrapped: false, // 이 API는 스크랩 여부를 알 수 없음
    scrapCount: 0, // '/api/recruitments'는 scrapCount를 제공하지 않음
  };
};

// API 호출 함수: (variant에 따라 경로 분기)
const getRecruitmentPosts = async (variant: 'main' | 'all'): Promise<Recruitment[]> => {
  try {
    // [수정됨] variant에 따라 엔드포인트 분기
    const endpoint = variant === 'main' 
      ? '/api/recruitments/main' 
      : '/api/recruitments';

    const res = await axios.get<ApiResponse<ApiRecruitmentDetail[]>>(endpoint);
    
    if (res.data.status !== 200) {
      throw new Error(res.data.message);
    }

    if (Array.isArray(res.data.data)) {
      return res.data.data.map(mapApiDetailToRecruitment);
    }
    
    return []; // 데이터가 배열이 아니면 빈 배열 반환

  } catch (error) {
    console.error(`Error fetching recruitments (${variant}):`, error);
    return [];
  }
};


// 메인 훅 (variant 인자 추가)
const useRecruitments = (variant: 'main' | 'all' = 'all') => {
  const { 
    data: posts = [], 
    isLoading, 
    error 
  } = useQuery<Recruitment[], Error>({
    queryKey: ['recruitmentsList', variant], 
    queryFn: () => getRecruitmentPosts(variant),   
  });

  return { posts, isLoading, error };
};

export default useRecruitments;