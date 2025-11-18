// src/Hooks/useRecruitmentPost.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club'; 
import type { 
  ApiRecruitmentDetail, 
  ApiRecruitmentImages,
  Recruitment,
  RecruitmentStatus,
  RecruitmentType
} from '../types/recruit';

// API 호출
const fetchRecruitmentPost = async (recruitmentId: number): Promise<ApiRecruitmentDetail> => {
  const res = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${recruitmentId}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return res.data.data;
};

const fetchRecruitmentImages = async (recruitmentId: number): Promise<ApiRecruitmentImages> => {
  const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${recruitmentId}/images`);
  return res.data;
};

// 데이터 헬퍼
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

// 메인 훅
export const useRecruitmentPost = (recruitmentId: number | null) => {
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Recruitment | null, Error>({
    queryKey: ['recruitmentPost', recruitmentId],
    queryFn: async (): Promise<Recruitment | null> => {
      if (!recruitmentId) return null;

      const detailData = await fetchRecruitmentPost(recruitmentId);
      const imagesData = await fetchRecruitmentImages(recruitmentId);

      return {
        recruitmentId: detailData.id,
        clubId: detailData.clubId,
        clubName: detailData.clubName,
        title: detailData.title,
        description: detailData.description,
        type: detailData.type,
        phoneNumber: detailData.phoneNumber,
        email: detailData.email,
        startDate: detailData.startDate,
        endDate: detailData.endDate,
        createdAt: detailData.createdAt,
        url: detailData.url,

        images: imagesData,
        
        status: calculateStatus(detailData.type, detailData.endDate),
        dDay: calculateDDay(detailData.endDate),

        // [추가] 매핑
        viewCount: detailData.viewCount || 0,
        scrapCount: detailData.saveCount || 0,

        isScrapped: false,
      };
    },
    enabled: !!recruitmentId,
  });

  return { data, isLoading, isError, error };
};