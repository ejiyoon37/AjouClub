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

// 1. 공고 상세 정보 (텍스트)
const fetchRecruitmentDetail = async (id: number): Promise<ApiRecruitmentDetail> => {
  // Swagger 스크린샷 [image_d34208.jpg]을 기반으로, 
  // 파라미터 {clubId}가 실제로는 {recruitmentId}라고 판단하여 호출합니다.
  const res = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${id}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return res.data.data;
};

// 2. 공고 이미지 (URL 배열)
const fetchRecruitmentImages = async (id: number): Promise<ApiRecruitmentImages> => {
  // [image_d3456b.jpg] 참고
  const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${id}/images`);
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
export const useRecruitmentDetail = (recruitmentId: number | null) => {
  
  const results = useQueries({
    queries: [
      {
        queryKey: ['recruitmentDetail', recruitmentId],
        queryFn: () => fetchRecruitmentDetail(recruitmentId!),
        enabled: !!recruitmentId, // recruitmentId가 있을 때만 실행
      },
      {
        queryKey: ['recruitmentImages', recruitmentId],
        queryFn: () => fetchRecruitmentImages(recruitmentId!),
        enabled: !!recruitmentId,
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
    // (참고) 즐겨찾기(isScrapped) 상태는 별도 API로 확인해야 하나,
    // 현재는 API가 없으므로 기본값 false를 사용하고, 로컬에서만 관리합니다.
    isScrapped: false, 
    // (참고) scrapCount는 현재 API로 알 수 없습니다.
    scrapCount: 0,
  } : null;

  return { data, isLoading, isError, error };
};