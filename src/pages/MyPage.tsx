// src/pages/MyPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData'; // (수정)

import UserProfileSection from '../components/mypage/UserProfileSection';
import FavoriteRecruitmentList from '../components/mypage/FavoriteRecruitmentList';
import LogoIcon from '../assets/logo_typo.svg?react';

// (삭제) mockUser import

const MyPage = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // (수정) mock 데이터 대신 useMyPageData 훅 사용
  const { user, favorites, isLoading, error } = useMyPageData();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=${location.pathname}`, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  // (삭제) if (!isLoggedIn) return null;
  // (삭제) mockUser 직접 사용 부분
  
  const goToHome = () => navigate('/');

  // (새로 추가) 로딩 및 에러 처리
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        로딩 중...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        오류가 발생했습니다: {error?.message || '사용자 정보를 불러올 수 없습니다.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between w-full h-12 px-4 border-b border-gray-100 bg-white">
        <button onClick={goToHome} aria-label="홈으로 가기">
          <LogoIcon />
        </button>
      </header>

      {/* (수정) 훅에서 받아온 user 객체 전달 */}
      <UserProfileSection user={user} />

      {/* 구분선 */}
      <div className="w-full h-2 bg-gray-50" />

      {/* 저장한 공고 */}
      <div className="px-4 py-5">
        <p className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600 mb-2">
          저장한 공고
        </p>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-[16px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em] text-center">
              저장된 공고가 없습니다<br />
              관심있는 모집공고를 저장해 보세요!
            </p>
          </div>
        ) : (
          // (수정) 훅에서 받아온 favorites 맵핑
          favorites.map((item) => (
            <div key={item.recruitmentId}>
              <FavoriteRecruitmentList item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPage;