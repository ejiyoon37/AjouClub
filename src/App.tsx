// src/App.tsx
import { lazy, Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom';

import RouteChangeTracker from './components/common/RouteChangeTracker';
//관리자 권한 해제 테스트 위해 잠시 해제
//import AdminRoute from './components/common/AdminRoute'; 

//--- 일반 사용자 페이지 ---
const Homepage = lazy(() => import('./pages/Homepage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SearchResultPage = lazy(() => import('./pages/SearchResultPage'));
const RecruitmentPage = lazy(() => import('./pages/RecruitmentPage'));
const RecruitmentFilterPage = lazy(() => import('./pages/RecruitmentFilterPage'));
const ClubExplorePage = lazy(() => import('./pages/ClubExplorePage'));
const ClubFilterPage = lazy(() => import('./pages/ClubFilterPage'));
const MyPage = lazy(() => import('./pages/MyPage'));
const ClubDetailPage = lazy(() => import('./pages/ClubDetailPage'));
const RecruitmentDetailPage = lazy(() => import('./pages/RecruitDetailPage'));
const ClubAssessmentPage = lazy(() => import('./pages/ClubAssessmentPage')); // 자가진단

//--- 관리자 전용 페이지 ---
const ClubEditPage = lazy(() => import('./pages/admin/ClubEditPage'));
const RecruitmentWritePage = lazy(() => import('./pages/admin/RecruitmentWritePage'));
const ClubIntroEditPage = lazy(() => import('./pages/admin/ClubIntroEditPage'));


function App() {
  
  return (
    <Suspense fallback={<div className="p-4 text-center">로딩 중...</div>}>
      <RouteChangeTracker /> 
      <Routes>
        {/* === 일반 사용자 라우트 === */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* auth임시해제 (이전 상태 유지) */}
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/result" element={<SearchResultPage />} />
        
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/recruitment/filter" element={<RecruitmentFilterPage />} />
        <Route path="/recruitments/:recruitmentId" element={<RecruitmentDetailPage />} />
        
        <Route path="/clubs" element={<ClubExplorePage />} />
        <Route path="/clubs/filter" element={<ClubFilterPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailPage />} />

        <Route path="/assessment" element={<ClubAssessmentPage />} />

        
        {/* === 관리자 전용 라우트 (테스트를 위해 AdminRoute 임시 해제) === */}

        {/* 1. 동아리 정보 수정 */}
        {/* 
        <Route
          path="/admin/clubs/:clubId/edit"
          element={
            <AdminRoute>
              <ClubEditPage />
            </AdminRoute>
          }
        />
        */}
        {/* [테스트용 코드 - 접근 제한 없음] */}
        <Route
          path="/admin/clubs/:clubId/edit"
          element={<ClubEditPage />}
        />


        {/* 2. 모집 공고 작성 */}
        {/* 
        <Route
          path="/admin/clubs/:clubId/recruitments/new"
          element={
            <AdminRoute>
              <RecruitmentWritePage />
            </AdminRoute>
          }
        />
        */}
        {/* [테스트용 코드 - 접근 제한 없음] */}
        <Route
          path="/admin/clubs/:clubId/recruitments/new"
          element={<RecruitmentWritePage />}
        />

        {/* 3. 동아리 소개 수정 */}
        {/* 
        <Route
          path="/admin/clubs/:clubId/intro/edit"
          element={
            <AdminRoute>
              <ClubIntroEditPage />
            </AdminRoute>
          }
        />
        */}
        {/* [테스트용 코드 - 접근 제한 없음] */}
        <Route
          path="/admin/clubs/:clubId/intro/edit"
          element={<ClubIntroEditPage />}
        />
      
      </Routes>
    </Suspense>
  );
}

export default App;