// src/App.tsx
import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuthStore } from './stores/useAuthStore';
//import RequireAuth from './components/common/RequireAuth';
import RouteChangeTracker from './components/common/RouteChangeTracker';

//lazy loading 적용
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



function App() {
  const rehydrateAuth = useAuthStore((state) => state.rehydrateAuth);

  useEffect(() => {
    rehydrateAuth();
  }, []);

  return (
    <Suspense fallback={<div className="p-4 text-center">로딩 중...</div>}>
      {/* 2. 라우터 추적기 추가 */}
      <RouteChangeTracker /> 
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* auth임시해제 */}
      {/* <Route path="/mypage" element={
        <RequireAuth>
          <MyPage />
        </RequireAuth>
      } /> */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/recruitment" element={<RecruitmentPage />} />
      <Route path="/recruitment/filter" element={<RecruitmentFilterPage />} />
      <Route path="/clubs" element={<ClubExplorePage />} />
      <Route path="/clubs/filter" element={<ClubFilterPage />} />

      <Route path="/recruitments/:clubId" element={<RecruitmentDetailPage />} />
      <Route path="/clubs/:clubId" element={<ClubDetailPage />} />
      {/* <Route
        path="/clubs/:clubId"
        element={
          <RequireAuth>
            <ClubDetailPage />
          </RequireAuth>
        }
      />

      <Route
        path="/recruitment/:recruitmentId"
        element={
          <RequireAuth>
            <RecruitmentDetailPage />
          </RequireAuth>
        }
      /> */}
    </Routes>
  </Suspense>
  );
}

export default App;