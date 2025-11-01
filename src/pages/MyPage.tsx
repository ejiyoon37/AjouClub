// src/pages/MyPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData'; 

import UserProfileSection from '../components/mypage/UserProfileSection';
import FavoriteRecruitmentList from '../components/mypage/FavoriteRecruitmentList';
// (수정) Header 임포트
import Header from '../components/common/Header'; 
// (삭제) LogoIcon
import { logout as requestLogout } from '../api/auth'; // (새로 추가)

const MyPage = () => {
  // (수정) logout 상태 가져오기
  const { isLoggedIn, logout } = useAuthStore(); 
  const navigate = useNavigate();
  const location = useLocation();

  const { user, favorites, isLoading, error } = useMyPageData();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=${location.pathname}`, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  // (삭제) goToHome
  
  // (새로 추가) 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await requestLogout(); // API 호출
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    }
    logout(); // Zustand 상태 초기화
    window.location.href = '/'; // 홈으로 이동
  };

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
    // (수정) pb-20 (로그아웃 버튼 공간)
    <div className="min-h-screen bg-gray-50 pb-20"> 
      {/* (수정) 공통 헤더 사용 */}
      <Header variant="page" />

      <UserProfileSection user={user} />

      {/* 구분선 */}
      <div className="w-full h-2 bg-gray-50" />

      {/* 저장한 공고 */}
      <div className="px-4 py-5">
        <p className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600 mb-2">
          저장한 공고
        </p>

        {favorites.length === 0 ? (
          // (수정) Figma(image_de22c9.png)에 맞게 텍스트 수정
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-[16px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em] text-center">
              저장한 공고가 없습니다
            </p>
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item.recruitmentId}>
              <FavoriteRecruitmentList item={item} />
            </div>
          ))
        )}
      </div>

      {/* (새로 추가) 로그아웃 버튼 (페이지 최하단) */}
      <div className="px-6 mt-10">
        <button
          className="text-[12px] font-medium underline text-gray-600 leading-[140%] tracking-[-0.03em]"
          onClick={handleLogout}
        >
          로그아웃하기
        </button>
      </div>
    </div>
  );
};

export default MyPage;