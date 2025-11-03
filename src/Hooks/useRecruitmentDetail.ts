// src/Hooks/useRecruitmentDetail.ts

import { useQueries } from '@tanstack/react-query';
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
const fetchRecruitmentDetail = async (clubId: number): Promise<ApiRecruitmentDetail> => {

  const res = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${clubId}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return res.data.data;
};


const fetchRecruitmentImages = async (clubId: number): Promise<ApiRecruitmentImages> => {

  const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${clubId}/images`);
  return res.data;
};

// --- 데이터 계산 헬퍼 ---

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

// --- 메인 훅 ---

export const useRecruitmentDetail = (clubId: number | null) => {
  
  const results = useQueries({
    queries: [
      {
        queryKey: ['recruitmentDetail', clubId],
        queryFn: () => fetchRecruitmentDetail(clubId!), 
        enabled: !!clubId,
      },
      {
        queryKey: ['recruitmentImages', clubId], 
        queryFn: () => fetchRecruitmentImages(clubId!), 
        enabled: !!clubId, 
      },
    ],
  });

  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);
  const error = results.find((query) => query.error)?.error;

  const detailData = results[0].data as ApiRecruitmentDetail | undefined;
  const imagesData = results[1].data as ApiRecruitmentImages | undefined;

  // 두 API가 모두 성공적으로 로드되었을 때 데이터 조합
  const data: Recruitment | null = (detailData && imagesData) ? {
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

    // 2. 이미지 API 결과
    images: imagesData,
    
    // 3. 계산된 필드
    status: calculateStatus(detailData.type, detailData.endDate),
    dDay: calculateDDay(detailData.endDate),

    // 4. API에 없는 필드 (기본값)
    
    isScrapped: false, 
    scrapCount: 0,
  } : null;

  return { data, isLoading, isError, error };
};