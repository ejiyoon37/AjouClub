// src/pages/MyPage.tsx

import { useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData';
import useClubs from '../Hooks/useClubs'; // 전체 동아리 정보 가져오기 위해 추가

import UserProfileSection from '../components/mypage/UserProfileSection';
import FavoriteRecruitmentList from '../components/mypage/FavoriteRecruitmentList';
import Header from '../components/common/Header';
import { logout as requestLogout } from '../api/auth.js';

// 관리자용 동아리 아이템 컴포넌트 (내부 정의 또는 분리) 
import ManagedClubItem from '../components/mypage/ManagedClubItem';

const MyPage = () => {
  const { isLoggedIn, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const { favorites, isLoading, error } = useMyPageData();
  
  // 전체 동아리 목록을 가져와서 내가 관리하는 동아리 정보만 필터링
  const { clubs: allClubs } = useClubs({}); 
  
  const myManagedClubs = useMemo(() => {
    if (!user?.managedClubIds || !allClubs) return [];
    return allClubs.filter(club => user.managedClubIds.includes(club.clubId));
  }, [user, allClubs]);

  const isManager = myManagedClubs.length > 0; 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=${location.pathname}`, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  const handleLogout = async () => {
    try {
      await requestLogout();
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    }
    logout();
    window.location.href = '/';
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  if (error || !user) return <div className="flex justify-center items-center min-h-screen">오류가 발생했습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header variant="page" />

      <UserProfileSection user={user} />

      <div className="w-full h-2 bg-gray-50" />

      {/* 운영중인 동아리 섹션 (관리자 전용) */}
      {isManager && (
        <>
          <div className="px-4 py-5 bg-white">
            <p className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600 mb-3">
              운영중인 동아리
            </p>
            <div className="space-y-3">
              {myManagedClubs.map((club) => (
                <ManagedClubItem 
                  key={club.clubId} 
                  club={{
                    clubId: club.clubId,
                    clubName: club.clubName,
                    logoUrl: club.profileImageUrl // useClubs의 필드명에 맞춤
                  }} 
                />
              ))}
            </div>
          </div>
          <div className="w-full h-2 bg-gray-50" />
        </>
      )}


      {/* 저장한 공고 */}
      <div className="px-4 py-5 bg-white">
        <p className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600 mb-2">
          저장한 공고
        </p>
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-[16px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em] text-center">
              저장한 공고가 없습니다
            </p>
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item.recruitmentId} className="mb-3">
               <FavoriteRecruitmentList item={item} />
            </div>
          ))
        )}
      </div>

      <div className="px-4 mt-10">
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