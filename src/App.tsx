// src/App.tsx
import { lazy, Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom';

import RouteChangeTracker from './components/common/RouteChangeTracker';
import RequireAuth from './components/common/RequireAuth'; // RequireAuth import 확인

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
const ClubAssessmentPage = lazy(() => import('./pages/ClubAssessmentPage'));
const ClubAssessmentResultPage = lazy(() => import('./pages/ClubAssessmentResultPage')); 

//--- 관리자 전용 페이지 ---
const ClubEditPage = lazy(() => import('./pages/admin/ClubEditPage'));
const RecruitmentWritePage = lazy(() => import('./pages/admin/RecruitmentWritePage'));
const RecruitmentEditPage = lazy(() => import('./pages/admin/RecruitmentEditPage'));
const ClubIntroEditPage = lazy(() => import('./pages/admin/ClubIntroEditPage'));

function App() {
  
  return (
    <Suspense fallback={<div className="p-4 text-center">로딩 중...</div>}>
      <RouteChangeTracker /> 
      <Routes>
        {/* === 일반 사용자 라우트 === */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/result" element={<SearchResultPage />} />
        
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/recruitment/filter" element={<RecruitmentFilterPage />} />
        
        {/* [수정] 모집 공고 상세: 로그인 필요 */}
        <Route 
          path="/recruitments/:recruitmentId" 
          element={
            <RequireAuth>
              <RecruitmentDetailPage />
            </RequireAuth>
          } 
        />
        
        <Route path="/clubs" element={<ClubExplorePage />} />
        <Route path="/clubs/filter" element={<ClubFilterPage />} />
        
        {/* [수정] 동아리 상세: 로그인 필요 */}
        <Route 
          path="/clubs/:clubId" 
          element={
            <RequireAuth>
              <ClubDetailPage />
            </RequireAuth>
          } 
        />

        <Route path="/assessment" element={<ClubAssessmentPage />} />
        <Route path="/assessment/result" element={<ClubAssessmentResultPage />} />

        
        {/* === 관리자 전용 라우트 (테스트를 위해 AdminRoute 임시 해제 상태 유지) === */}

        <Route
          path="/admin/clubs/:clubId/edit"
          element={<ClubEditPage />}
        />

        <Route
          path="/admin/clubs/:clubId/recruitments/new"
          element={<RecruitmentWritePage />}
        />

        <Route
          path="/admin/recruitments/:recruitmentId/edit"
          element={<RecruitmentEditPage />}
        />

        <Route
          path="/admin/clubs/:clubId/intro/edit"
          element={<ClubIntroEditPage />}
        />
      
      </Routes>
    </Suspense>
  );
}

export default App;