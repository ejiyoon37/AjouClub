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

// --- API 호출 함수 ---

// 1. 상세 정보 (텍스트)
const fetchRecruitmentPost = async (recruitmentId: number): Promise<ApiRecruitmentDetail> => {
  // URL 경로 수정: {recruitmentId} 사용
  const res = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${recruitmentId}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return res.data.data;
};

// 2. 이미지
const fetchRecruitmentImages = async (recruitmentId: number): Promise<ApiRecruitmentImages> => {
  const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${recruitmentId}/images`);
  return res.data;
};

// --- 데이터 계산 헬퍼 (D-Day, Status) ---

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
  type: RecruitmentType,
  endDate: string | null
): RecruitmentStatus => {
  if (type === '상시모집') return 'regular';
  if (!endDate) return 'regular';
  const dDay = calculateDDay(endDate);
  if (dDay === 0) return 'end';
  if (dDay <= 7) return 'd-day';
  return 'regular';
};

// --- 메인 훅 ---

export const useRecruitmentPost = (recruitmentId: number | null) => {

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Recruitment | null, Error>({
    queryKey: ['recruitmentPost', recruitmentId], // 쿼리 키 변경
    queryFn: async (): Promise<Recruitment | null> => {
      if (!recruitmentId) return null;

      // 1. 상세 정보(텍스트)
      const detailData = await fetchRecruitmentPost(recruitmentId);
      
      // 2. 이미지
      const imagesData = await fetchRecruitmentImages(recruitmentId);

      // 3. 최종 Recruitment 객체 (단일)
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

        images: imagesData, // 이미지 API 결과
        
        status: calculateStatus(detailData.type, detailData.endDate), // 계산된 값
        dDay: calculateDDay(detailData.endDate), // 계산된 값

        isScrapped: false, // API에 없는 필드 (기본값)
        scrapCount: 0, // API에 없는 필드 (기본값)
      };
    },
    enabled: !!recruitmentId, // recruitmentId가 있을 때만 실행
  });

  return { data, isLoading, isError, error };
};