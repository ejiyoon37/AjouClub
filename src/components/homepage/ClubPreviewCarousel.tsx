// src/components/homepage/ClubPreviewCarousel.tsx

import React, { useMemo } from 'react'; 
import useClubs from '../../Hooks/useClubs'; 
import type { Club } from '../../types/club';
import ClubCard from '../common/Card/Card_Club';
import SeeAllButton from '../common/SeeAllBtn';

const getRandomClubs = (clubs: Club[], count: number): Club[] => {
  const shuffled = [...clubs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ClubPreviewCarousel = () => {
 
  const { clubs: allClubs, isLoading, error } = useClubs({});

 
  const randomClubs = useMemo(() => {
    if (!allClubs) return [];
    return getRandomClubs(allClubs, 6); 
  }, [allClubs]); 

  
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