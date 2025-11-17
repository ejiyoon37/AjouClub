// src/pages/RecruitDetailPage.tsx

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import Header from '../components/common/Header';
import RecruitmentMetaSection from '../components/recruit-detail/RecruitmentMeta';
import RecruitmentImage from '../components/recruit-detail/RecruitmentImage';
import RecruitmentDescription from '../components/recruit-detail/RecruitmentDescription';
import RecruitmentApplyBar from '../components/recruit-detail/RecruitmentApplyBar';

// [수정됨] useRecruitmentDetail -> useRecruitmentPost 훅 사용
import { useRecruitmentPost } from '../Hooks/useRecruitmentPost';
import { addToFavorites, removeFromFavorites } from '../Api/recruitment';
import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData';

const RecruitmentDetailPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // [수정됨] clubId -> recruitmentId
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  // [수정됨] recruitmentId 사용
  const numericId = recruitmentId ? Number(recruitmentId) : null;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const {
    data: recruitment,
    isLoading: isRecruitmentLoading,
    isError,
    error,
  } = useRecruitmentPost(numericId); // [수정됨] 훅 이름 변경
  const { favorites, isLoading: isFavoritesLoading } = useMyPageData();

  const [isScrapped, setIsScrapped] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);

  const userScrapStatus = useMemo(() => {
    if (!isLoggedIn || !favorites || !recruitment) {
      return false;
    }

    return favorites.some(
      (fav) => fav.recruitmentId === recruitment.recruitmentId
    );
  }, [isLoggedIn, favorites, recruitment]);

  useEffect(() => {
    if (recruitment) {
      setScrapCount(recruitment.scrapCount);
    }
  }, [recruitment]);

  useEffect(() => {
    if (!isFavoritesLoading) {
      setIsScrapped(userScrapStatus);
    }
  }, [userScrapStatus, isFavoritesLoading]);

  const handleToggleScrap = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }
    if (!recruitment) return;

    try {
      if (isScrapped) {
        // 스크랩 취소
        await removeFromFavorites(recruitment.recruitmentId);
        setIsScrapped(false);
        setScrapCount((prev) => (prev > 0 ? prev - 1 : 0));
        queryClient.invalidateQueries({ queryKey: ['myFavorites'] }); 
      } else {
        // 스크랩 추가
        await addToFavorites(recruitment.recruitmentId);
        setIsScrapped(true);
        setScrapCount((prev) => prev + 1);
        queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
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
  const isLoading = isRecruitmentLoading || (isLoggedIn && isFavoritesLoading);

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
        createdAt={recruitment.createdAt}
      />

      <RecruitmentImage imageUrl={recruitment.images[0] || undefined} />

      <RecruitmentDescription description={recruitment.description} />

      <RecruitmentApplyBar
        status={recruitment.status}
        isScrapped={isScrapped}
        scrapCount={scrapCount}
        onToggleScrap={handleToggleScrap}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};

export default RecruitmentDetailPage;