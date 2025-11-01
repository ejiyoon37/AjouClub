// src/Hooks/useMypageData.ts

import { useQuery } from '@tanstack/react-query'; // (수정)
import { getMyInfo, getFavoriteRecruitments } from '../api/user';
import type { UserInfo, FavoriteRecruitment } from '../types/user'; // (수정)


export const useMyPageData = () => {

  const { 
    data: user, 
    isLoading: isUserLoading,
    error: userError 
  } = useQuery<UserInfo, Error>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo, // Api/user.ts의 getMyInfo 사용
  });

  const { 
    data: favorites = [], // 기본값 빈 배열
    isLoading: isFavoritesLoading,
    error: favoritesError
  } = useQuery<FavoriteRecruitment[], Error>({
    queryKey: ['myFavorites'],
    queryFn: getFavoriteRecruitments, // Api/user.ts의 getFavoriteRecruitments 사용
    enabled: !!user, 
  });


  return { 
    user, 
    favorites, 
    isLoading: isUserLoading || isFavoritesLoading, // 둘 중 하나라도 로딩 중이면 로딩
    error: userError || favoritesError
  };
};