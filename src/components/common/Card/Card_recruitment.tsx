// src/components/common/Card/Card_recruitment.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../../../utils/axios';
import PeriodChip from '../../ui/Chip/Chip_period';
import ScrapIconDefault from '../../../assets/icon/ScrapBtn_default-2.svg?react';
import ScrapIconActive from '../../../assets/icon/ScrapBtn_activated.svg?react';
import { addToFavorites, removeFromFavorites } from '../../../api/recruitment.js';
import DefaultImage from '../../../assets/img/Default_images.png';
import { useAuthStore } from '../../../stores/useAuthStore';

interface RecruitmentCardProps {
  recruitmentId: number;
  clubId: number;
  images: string[];
  title: string;
  status: 'regular' | 'd-day' | 'end';
  dDay?: number;
  viewCount?: number;
  scrapCount: number;
  isScrappedInitially?: boolean;
}

//  카드 썸네일
const fetchThumbnail = async (recruitmentId: number): Promise<string[]> => {
  try {
    const res = await axios.get<string[]>(
      `/api/recruitments/${recruitmentId}/images`
    );
    return res.data;
  } catch (error) {
    // 404 등 에러 발생 시 빈 배열 반환
    return [];
  }
};

const RecruitmentCard = ({
  recruitmentId,
  //clubId,
  title,
  status,
  dDay,
  viewCount,
  scrapCount: initialScrapCount,
  isScrappedInitially = false,
}: RecruitmentCardProps) => {
  const [isScrapped, setIsScrapped] = useState(isScrappedInitially);
  const [scrapCount, setScrapCount] = useState(initialScrapCount);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  // recruitmentId로 썸네일 쿼리
  const { data: thumbnailImages } = useQuery<string[], Error>({
    queryKey: ['recruitmentThumbnail', recruitmentId],
    queryFn: () => fetchThumbnail(recruitmentId),
    staleTime: Infinity,
  });

  const handleScrapClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }

    try {
      if (!isScrapped) {
        await addToFavorites(recruitmentId);
        setIsScrapped(true);
        setScrapCount((prev) => prev + 1);
      } else {
        await removeFromFavorites(recruitmentId);
        setIsScrapped(false);
        setScrapCount((prev) => prev - 1);
      }
      //무효화
      queryClient.invalidateQueries({ queryKey: ['myFavorites'] });
    } catch (error) {
      console.error('스크랩 처리 중 오류:', error);
    }
  };

  const handleCardClick = () => {
    // [수정됨] clubId -> recruitmentId
    navigate(`/recruitments/${recruitmentId}`);
  };

  // thumbnailImages from API 사용
  const thumbnailUrl = thumbnailImages?.[0] || DefaultImage;

  return (
    <div
      className="flex flex-col w-[109px] min-h-[202px] gap-2 bg-white cursor-pointer"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      {/* 모집공고 이미지 + 스크랩 */}
      <div className="relative">
        <img
          className="w-[109px] h-[109px] object-cover rounded-[8px] border border-gray-100"
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          loading="lazy"
          decoding="async"
        />
        <button
          onClick={handleScrapClick}
          className="absolute top-2 right-2"
          aria-label="스크랩"
        >
          {isScrapped ? (
            <ScrapIconActive className="w-5 h-5" />
          ) : (
            <ScrapIconDefault className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 모집공고 제목 */}
      <h3 className="text-sm font-medium text-gray-800 leading-[1.35] tracking-[-0.03em] h-[38px] line-clamp-2">
        {title}
      </h3>

      {/* 모집 상태 뱃지 */}
      <div className="mt-1 flex justify-start">
        <PeriodChip status={status} dDay={dDay} size="small" />
      </div>

      {/* 조회수 & 저장수 */}
      <div className="text-xs text-gray-300 font-normal leading-[1.4] tracking-[-0.02em]">
        {viewCount !== undefined && <span>조회 {viewCount}</span>}
        <span className="ml-2">저장 {scrapCount}</span>
      </div>
    </div>
  );
};

export default RecruitmentCard;