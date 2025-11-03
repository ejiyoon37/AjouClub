// src/Hooks/useRecruitmentDetail.ts

import { useQuery } from '@tanstack/react-query'; // (수정) useQueries -> useQuery
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


const fetchRecruitmentImages = async (recruitmentId: number): Promise<ApiRecruitmentImages> => {
  const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${recruitmentId}/images`);
  return res.data;
};

// --- 데이터 계산 헬퍼 (유지) ---

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

// --- 메인 훅 (수정) ---

export const useRecruitmentDetail = (clubId: number | null) => {

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Recruitment | null, Error>({
    queryKey: ['recruitmentDetail', clubId], // clubId를 기본 키로 사용
    queryFn: async (): Promise<Recruitment | null> => {
      if (!clubId) return null;

      // 1. clubId로 상세 정보(텍스트)
      const detailData = await fetchRecruitmentDetail(clubId);
      
      // 2. 응답받은 상세 정보에서 recruitmentId (detailData.id)를 추출
      const recruitmentId = detailData.id; 

      // 3. 이미지
      const imagesData = await fetchRecruitmentImages(recruitmentId);

      // 4. 최종 Recruitment 객체
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
    enabled: !!clubId, // clubId가 있을 때만 실행
  });

  return { data, isLoading, isError, error };
};