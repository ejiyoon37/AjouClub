// src/Hooks/useMypageData.ts

import { useQuery } from '@tanstack/react-query'; 
import { getMyInfo, getFavoriteRecruitments } from '../api/user';
import type { UserInfo, FavoriteRecruitment } from '../types/user'; 
import { useAuthStore } from '../stores/useAuthStore';


export const useMyPageData = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { 
    data: user, 
    isLoading: isUserLoading,
    error: userError 
  } = useQuery<UserInfo, Error>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo, 
    enabled: isLoggedIn,
  });

  const { 
    data: favorites = [], 
    isLoading: isFavoritesLoading,
    error: favoritesError
  } = useQuery<FavoriteRecruitment[], Error>({
    queryKey: ['myFavorites'],
    queryFn: getFavoriteRecruitments,
    enabled: isLoggedIn,
  });


  return { 
    user, 
    favorites, 
    isLoading: isUserLoading || isFavoritesLoading, // 둘 중 하나라도 로딩 중이면 로딩
    error: userError || favoritesError
  };
};