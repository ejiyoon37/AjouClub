// src/components/homepage/ClubPreviewCarousel.tsx

import React, { useMemo } from 'react'; // (수정) useEffect, useState -> useMemo
import useClubs from '../../Hooks/useClubs'; // (수정) Mock 대신 실제 useClubs 훅 임포트
import type { Club } from '../../types/club';
import ClubCard from '../common/Card/Card_Club';
import SeeAllButton from '../common/SeeAllBtn';

const getRandomClubs = (clubs: Club[], count: number): Club[] => {
  const shuffled = [...clubs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ClubPreviewCarousel = () => {
  // (수정) useClubs 훅으로 실제 API 데이터 호출
  const { clubs: allClubs, isLoading, error } = useClubs({});

  // (수정) useEffect/useState 대신 useMemo 사용
  const randomClubs = useMemo(() => {
    if (!allClubs) return [];
    return getRandomClubs(allClubs, 6); // 6개만 랜덤으로 보여주기
  }, [allClubs]); // allClubs 데이터가 로드되면 계산

  // (삭제) useEffect, useState
 
  // (새로 추가) 로딩 및 에러 처리
  if (isLoading) {
    return (
      <section className="mt-6 py-12 bg-white px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">동아리 둘러보기</h2>
          <SeeAllButton navigateTo="/clubs" />
        </div>
        <div className="text-center text-gray-500">로딩 중...</div>
      </section>
    );
  }
 
  if (error) {
    return (
      <section className="mt-6 py-12 bg-white px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">동아리 둘러보기</h2>
          <SeeAllButton navigateTo="/clubs" />
        </div>
        <div className="text-center text-red-500">데이터 로드 실패</div>
      </section>
    );
  }

  return (
    <section className="mt-6 py-12 bg-white">
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">동아리 둘러보기</h2>
          <SeeAllButton navigateTo="/clubs" />
        </div>
      </div>
      <div className="pl-4 flex space-x-2 overflow-x-auto pb-2 -mt-2 scrollbar-hide">
        {/* (수정) randomClubs 맵핑 */}
        {randomClubs.map((club) => (
          <ClubCard
            key={club.clubId}
            club={club}
          />
        ))}
      </div>
    </section>
  );
};

export default ClubPreviewCarousel;