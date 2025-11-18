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

const calculateStatus = (
  _type: RecruitmentType,
  endDate: string | null
): RecruitmentStatus => {

  if (!endDate) return 'regular'; 

  const dDay = calculateDDay(endDate);
  
  if (dDay === 0) return 'end';
  if (dDay <= 7) return 'd-day';
  return 'regular'; 
};

// 맵퍼 함수
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
    
    images: [], 
    status: status,
    dDay: dDay,
    viewCount: apiPost.viewCount || 0,
    scrapCount: apiPost.saveCount || 0,
    
    isScrapped: false,
  };
};

const getRecruitmentPosts = async (variant: 'main' | 'all'): Promise<Recruitment[]> => {
  try {
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
    return []; 
  } catch (error) {
    console.error(`Error fetching recruitments (${variant}):`, error);
    return [];
  }
};

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