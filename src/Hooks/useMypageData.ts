// src/hooks/useMyPageData.ts

import { useEffect, useState } from 'react';
import { getMyInfo, getFavoriteRecruitments } from '../api/user';

export const useMyPageData = () => {
  const [user, setUser] = useState<{ name: string; email: string; profilePic: string } | null>(null);
  const [favorites, setFavorites] = useState<
    { recruitmentId: number; title: string; thumbnailUrl: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getMyInfo();
        const favRes = await getFavoriteRecruitments();
        setUser(userRes);
        setFavorites(favRes);
      } catch (e) {
        console.error('마이페이지 데이터 오류:', e);
      }
    };
    fetchData();
  }, []);

  return { user, favorites };
};