// src/mocks/fetchMockRecruitList.ts

import { mockRecruitments } from './mockRecruitments';
import type { RecruitmentPost } from '../Hooks/useRecruitments';

/**
 * UI 개발용 mock 데이터를 기반으로 모집공고 리스트를 페이징하여 반환합니다.
 * 실제 API 연결 전까지 임시로 사용합니다.
 */
export const fetchMockRecruitList = async (
  page: number = 1,
  size: number = 6
): Promise<RecruitmentPost[]> => {
  const start = (page - 1) * size;
  const end = start + size;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecruitments.slice(start, end));
    }, 300); // 300ms 지연을 줘서 API 느낌
  });
};
