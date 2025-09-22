// // src/pages/MyPage.tsx

// import React, { useEffect } from 'react';
// import { useMyPageData } from '../Hooks/useMypageData';
// import UserProfileSection from '../components/mypage/UserProfileSection';
// import FavoriteRecruitmentList from '../components/mypage/FavoriteRecruitmentList';
// import LogoIcon from '../assets/logo_typo.svg?react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuthStore } from '../stores/useAuthStore';

// const MyPage = () => {
//   const { isLoggedIn } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate(`/login?redirect=${location.pathname}`, { replace: true });
//     }
//   }, [isLoggedIn, navigate, location]);

//   if (!isLoggedIn) return null;

//   const { user, favorites } = useMyPageData();

//   const goToHome = () => navigate('/');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="flex items-center justify-between w-full h-12 px-4 border-b border-gray-100 bg-white">
//         <button onClick={goToHome} aria-label="홈으로 가기">
//           <LogoIcon />
//         </button>
//       </header>

//       {/* 사용자 프로필 */}
//       {user && <UserProfileSection user={user} />}

//       {/* 구분선 */}
//       <div className="w-full h-2 bg-gray-50" />

//       {/* 저장한 공고 */}
//       <div className="px-4 py-5">
//         <p className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600 mb-2">
//           저장한 공고
//         </p>

//         {favorites.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-16">
//             <p className="text-[16px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em] text-center">
//                 저장된 공고가 없습니다<br />
//                 관심있는 모집공고를 저장해 보세요!
//             </p>
//             </div>
//             ) : (
//             favorites.map((item) => (
//             <div key={item.recruitmentId}>
//                 <FavoriteRecruitmentList item={item} />
//             </div>
//             ))
//             )}
//         </div>
//     </div>
//   );
// };

// export default MyPage;

// src/pages/MyPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

import UserProfileSection from '../components/mypage/UserProfileSection';
import FavoriteRecruitmentList from '../components/mypage/FavoriteRecruitmentList';
import LogoIcon from '../assets/logo_typo.svg?react';

import { mockUser } from '../mocks/mockUsers';

const MyPage = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=${location.pathname}`, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) return null;

  // ✅ mock 데이터 직접 사용
  const user = mockUser;
  const favorites = mockUser.favorites;

  const goToHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between w-full h-12 px-4 border-b border-gray-100 bg-white">
        <button onClick={goToHome} aria-label="홈으로 가기">
          <LogoIcon />
        </button>
      </header>

      {/* 사용자 프로필 */}
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