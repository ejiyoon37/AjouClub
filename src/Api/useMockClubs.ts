// ✅ mock 데이터를 사용하는 임시 UI 개발용 설정 (ClubPreviewCarousel용)

import { useEffect, useState } from 'react';
import type { Club } from '../types/club';
import { mockClubs } from '../mocks/mockClubs';

export const fetchAllClubs = async (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClubs);
    }, 300); // 300ms 딜레이로 실제 API처럼
  });
};

