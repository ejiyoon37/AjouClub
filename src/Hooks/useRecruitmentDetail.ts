// src/Hooks/useRecruitmentDetail.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club'; 
import type { 
  ApiRecruitmentDetail, 
  Recruitment,
  RecruitmentStatus,
  RecruitmentType
} from '../types/recruit';

const fetchRecruitmentDetail = async (clubId: number): Promise<ApiRecruitmentDetail[]> => {
  const res = await axios.get<ApiResponse<ApiRecruitmentDetail[]>>(`/api/recruitments/club/${clubId}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return Array.isArray(res.data.data) ? res.data.data : []; 
};

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

export const useRecruitmentDetail = (clubId: number | null) => {
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Recruitment[] | null, Error>({ 
    queryKey: ['recruitmentDetail', clubId], 
    queryFn: async (): Promise<Recruitment[] | null> => { 
      if (!clubId) return null;

      const detailDataList = await fetchRecruitmentDetail(clubId);
      
      if (!detailDataList || detailDataList.length === 0) {
        return []; 
      }

      return detailDataList.map((detailData) => {
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

          images: [], 
          
          status: calculateStatus(detailData.type, detailData.endDate),
          dDay: calculateDDay(detailData.endDate),

          // 매핑
          viewCount: detailData.viewCount || 0,
          scrapCount: detailData.saveCount || 0,

          isScrapped: false, 
        };
      });
    },
    enabled: !!clubId, 
  });

  return { data, isLoading, isError, error };
};