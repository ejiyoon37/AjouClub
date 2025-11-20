// src/pages/RecruitDetailPage.tsx

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import { useQueryClient } from '@tanstack/react-query';

import Header from '../components/common/Header';
import RecruitmentMetaSection from '../components/recruit-detail/RecruitmentMeta';
import RecruitmentImage from '../components/recruit-detail/RecruitmentImage';
import RecruitmentDescription from '../components/recruit-detail/RecruitmentDescription';
import RecruitmentApplyBar from '../components/recruit-detail/RecruitmentApplyBar';

import { useRecruitmentPost } from '../Hooks/useRecruitmentPost';
import { addToFavorites, removeFromFavorites, deleteRecruitment } from '../api/recruitment'; 
import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData';
import Modal from '../components/ui/Modal';

const RecruitmentDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location 훅 추가
  const queryClient = useQueryClient();

  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const numericId = recruitmentId ? Number(recruitmentId) : null;
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const {
    data: recruitment,
    isLoading: isRecruitmentLoading,
    isError,
    error,
  } = useRecruitmentPost(numericId);
  
  const { favorites, isLoading: isFavoritesLoading } = useMyPageData();

  const [isScrapped, setIsScrapped] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 관리자 여부 확인 (해당 공고의 동아리를 관리하는지)
  const isAdmin = useMemo(() => {
    if (!recruitment || !user?.managedClubIds) return false;
    return user.managedClubIds.includes(recruitment.clubId);
  }, [recruitment, user]);

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
        await removeFromFavorites(recruitment.recruitmentId);
        setIsScrapped(false);
        setScrapCount((prev) => (prev > 0 ? prev - 1 : 0));
        queryClient.invalidateQueries({ queryKey: ['myFavorites'] }); 
      } else {
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

  const handleEdit = () => {
    if (!recruitment) return;
    navigate(`/admin/recruitments/${recruitment.recruitmentId}/edit`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!recruitment) return;
    
    try {
      await deleteRecruitment(recruitment.recruitmentId);
      queryClient.invalidateQueries({ queryKey: ['recruitmentPost', recruitment.recruitmentId] });
      queryClient.invalidateQueries({ queryKey: ['recruitmentDetail', recruitment.clubId] });
      // 동아리 개별홈으로 이동
      navigate(`/clubs/${recruitment.clubId}`);
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제에 실패했습니다.');
    }
  };

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

  return (
    <div className="bg-white min-h-screen pb-[80px]">
      <Header variant="page" />

      <RecruitmentMetaSection
        title={recruitment.title}
        status={recruitment.status}
        dDay={recruitment.dDay}
        createdAt={recruitment.createdAt}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
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

      {/* 삭제 확인 모달 */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div 
            className="bg-white w-[274px] overflow-hidden rounded-[16px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: 'Wanted Sans' }}
          >
            {/* 텍스트 영역 */}
            <div className="w-[274px] min-h-[104px] pt-7 px-2 pb-7 gap-2 rounded-t-[16px] flex flex-col">
              <div className="space-y-2">
                <p 
                  className="text-[16px] font-medium leading-[165%] tracking-[-0.03em] text-center text-[#3F454A]"
                  style={{ fontFamily: 'Wanted Sans' }}
                >
                  삭제하면 되돌릴 수 없어요.
                </p>
                <p 
                  className="text-[16px] font-medium leading-[165%] tracking-[-0.03em] text-center text-[#3F454A]"
                  style={{ fontFamily: 'Wanted Sans' }}
                >
                  이 공고를 정말 삭제할까요?
                </p>
              </div>
            </div>
            
            {/* 버튼 영역 */}
            <div className="flex gap-0">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-[137px] h-[48px] py-2 px-3 gap-2 bg-gray-50 rounded-bl-[16px] text-[16px] font-medium leading-[135%] tracking-[-0.03em] text-center text-[#A0AAB0] transition-colors hover:bg-gray-100"
                style={{ fontFamily: 'Wanted Sans' }}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="w-[137px] h-[48px] py-2 px-3 gap-2 bg-[#FE5454] rounded-br-[16px] text-[16px] font-semibold leading-[135%] tracking-[-0.03em] text-center text-white transition-colors hover:bg-[#E64444]"
                style={{ fontFamily: 'Wanted Sans' }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecruitmentDetailPage;