import { useEffect, useState } from 'react';
import { getMyInfo, getFavoriteRecruitments } from '../api/user';
import { mockUser } from '../mocks/mockUsers';

interface Favorite {
  recruitmentId: number;
  title: string;
  thumbnailUrl: string;
}

interface User {
  name: string;
  email: string;
  profilePic?: string;
  favorites: Favorite[]; 
}

export const useMyPageData = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getMyInfo();
        const favRes = await getFavoriteRecruitments();
        setUser({ ...userRes, favorites: favRes });
      } catch (e) {
        console.warn('⚠️ 실제 API 호출 실패. mock 데이터로 대체합니다.');
        setUser(mockUser); 
      }
    };

    fetchData(); 
  }, []);

  return { user, favorites: user?.favorites ?? [] };
};