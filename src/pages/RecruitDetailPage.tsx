// src/pages/RecruitDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import Header from '../components/common/Header';
import RecruitmentMetaSection from '../components/recruit-detail/RecruitmentMeta';
import RecruitmentImage from '../components/recruit-detail/RecruitmentImage';
import RecruitmentDescription from '../components/recruit-detail/RecruitmentDescription';
import RecruitmentApplyBar from '../components/recruit-detail/RecruitmentApplyBar';


import { useRecruitmentDetail } from '../Hooks/useRecruitmentDetail';
import { addToFavorites, removeFromFavorites  } from '../api/recruitment';
import { useAuthStore } from '../stores/useAuthStore'; 



const RecruitmentDetailPage = () => {
  const navigate = useNavigate();

  const { clubId } = useParams<{ clubId: string }>();

  const numericId = clubId ? Number(clubId) : null;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); 

  const { data: recruitment, isLoading, isError, error } = useRecruitmentDetail(numericId);


  const [isScrapped, setIsScrapped] = useState(false);
  const [scrapCount, setScrapCount] = useState(0); 

  
  useEffect(() => {
    if (recruitment) {
      
      setIsScrapped(recruitment.isScrapped);
      setScrapCount(recruitment.scrapCount);
    }
  }, [recruitment]); 
  const handleToggleScrap = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }
    if (!recruitment) return;

    try {
      if (isScrapped) {
        await removeFromFavorites(recruitment.recruitmentId);
        setIsScrapped(false);
        setScrapCount((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        await addToFavorites(recruitment.recruitmentId);
        setIsScrapped(true);
        setScrapCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Scrap toggle failed:', err);
      alert('요청에 실패했습니다.');
    }
  };

  const handleApplyClick = () => {
    if (!recruitment?.url) {
      alert('신청 링크가 없습니다.');
      return;
    }
    

    let url = recruitment.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // --- 로딩 및 에러 처리 ---
  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (isError || !recruitment) {
    return (
      <div className="p-4 text-center text-red-500">
        오류가 발생했습니다: {error?.message || '공고를 찾을 수 없습니다.'}
      </div>
    );
  }
  
  // --- 성공 시 렌더링 ---
  return (
    <div className="bg-white min-h-screen pb-[80px]">
      <Header variant="page" />

      <RecruitmentMetaSection
        title={recruitment.title}
        status={recruitment.status}
        dDay={recruitment.dDay}
        createdAt={recruitment.createdAt} // "YYYY-MM-DDTHH..."
      />


      <RecruitmentImage imageUrl={recruitment.images[0] || undefined} />

      <RecruitmentDescription description={recruitment.description} />

      <RecruitmentApplyBar
        status={recruitment.status}
        isScrapped={isScrapped} // 로컬 state 사용
        scrapCount={scrapCount} // 로컬 state 사용
        onToggleScrap={handleToggleScrap}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};

export default RecruitmentDetailPage;