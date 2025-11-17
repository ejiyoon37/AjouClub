// src/Hooks/useRecruitmentDetail.ts

import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { ApiResponse } from '../types/club'; 
import type { 
  ApiRecruitmentDetail, 
  // ApiRecruitmentImages, // 개별 이미지 로딩 제거
  Recruitment,
  RecruitmentStatus,
  RecruitmentType
} from '../types/recruit';

// --- API 호출 함수 (배열 반환 ver) ---
const fetchRecruitmentDetail = async (clubId: number): Promise<ApiRecruitmentDetail[]> => {
  const res = await axios.get<ApiResponse<ApiRecruitmentDetail[]>>(`/api/recruitments/club/${clubId}`);
  if (res.data.status !== 200) throw new Error(res.data.message);
  return Array.isArray(res.data.data) ? res.data.data : []; 
};

// (참고: fetchRecruitmentImages는 2단계에서 상세페이지용 훅으로 분리 필요)
// const fetchRecruitmentImages = async (recruitmentId: number): Promise<ApiRecruitmentImages> => {
//   const res = await axios.get<ApiRecruitmentImages>(`/api/recruitments/${recruitmentId}/images`);
//   return res.data;
// };

// --- 데이터 계산 헬퍼  ---

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

// --- 메인 훅 (배열 반환 ver) ---

export const useRecruitmentDetail = (clubId: number | null) => {

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useQuery<Recruitment[] | null, Error>({ // 배열 반환
    queryKey: ['recruitmentDetail', clubId], // (이 훅은 곧 변경될 것이므로 키는 유지)
    queryFn: async (): Promise<Recruitment[] | null> => { // 배열 반환
      if (!clubId) return null;

      // 1. clubId로 상세 정보(텍스트) 목록
      const detailDataList = await fetchRecruitmentDetail(clubId);
      
      if (!detailDataList || detailDataList.length === 0) {
        return []; // 빈 배열 반환
      }

      // 2. (임시) 이미지 로딩은 우선 비워둡니다.
      // (주: API가 썸네일을 같이 주지 않으면, N+1 쿼리 문제 발생 가능성 있음)

      // 3. 최종 Recruitment 객체 배열
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

          images: [], // (TODO: 썸네일 이미지가 API 응답에 포함되어야 함)
          
          status: calculateStatus(detailData.type, detailData.endDate), // 계산된 값
          dDay: calculateDDay(detailData.endDate), // 계산된 값

          isScrapped: false, // API에 없는 필드 (기본값)
          scrapCount: 0, // API에 없는 필드 (기본값)
        };
      });
    },
    enabled: !!clubId, // clubId가 있을 때만 실행
  });

  return { data, isLoading, isError, error };
};