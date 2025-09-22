// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/loginPage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import RecruitmentPage from './pages/RecruitmentPage';
import RecruitmentFilterPage from './pages/RecruitmentFilterPage';
import ClubExplorePage from './pages/ClubExplorePage';
import ClubFilterPage from './pages/ClubFilterPage';
import MyPage from './pages/MyPage';
import ClubDetailPage from './pages/ClubDetailPage';
import RecruitmentDetailPage from './pages/RecruitDetailPage';

import { useAuthStore } from './stores/useAuthStore';
import RequireAuth from './components/common/RequireAuth';

function App() {
  const rehydrateAuth = useAuthStore((state) => state.rehydrateAuth);

  useEffect(() => {
    rehydrateAuth();
  }, []);

  return (
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
    <Route path="/recruitments/:recruitmentId" element={<RecruitmentDetailPage />} />
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
  );
}

export default App;