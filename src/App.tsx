import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/loginPage';
import SearchResultPage from './pages/SearchResultPage';
import SearchPage from './pages/SearchPage';
import RecruitmentPage from './pages/RecruitmentPage';
import RecruitmentFilterPage from './pages/RecruitmentFilterPage';
import ClubExplorePage from './pages/ClubExplorePage';
import ClubFilterPage from './pages/ClubFilterPage';
import { rehydrateAuth } from './api/auth';
import MyPage from './pages/MyPage';
function App() {
  useEffect(() => {
    rehydrateAuth(); // 
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MyPage />} />
      <Route path="/mypage" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search/result" element={<SearchResultPage />} />
      <Route path="/recruitment" element={<RecruitmentPage />} />
      <Route path="/recruitment/filter" element={<RecruitmentFilterPage />} />
      <Route path="/clubs" element={<ClubExplorePage />} />
      <Route path="/clubs/filter" element={<ClubFilterPage />} />
    </Routes>
  );
}

export default App; 