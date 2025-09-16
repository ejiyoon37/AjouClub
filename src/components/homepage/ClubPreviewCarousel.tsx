import React, { useEffect, useState } from 'react';
//import { fetchAllClubs } from '../../Api/club'; // api 연결 시 수정
import { fetchAllClubs } from '../../Api/useMockClubs';
import type { Club } from '../../types/club';
import ClubCard from '../common/Card/Card_Club';
import SeeAllButton from '../common/SeeAllBtn';

const getRandomClubs = (clubs: Club[], count: number): Club[] => {
  return clubs
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, count);
};

const ClubPreviewCarousel = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allClubs = await fetchAllClubs();
        const randomClubs = getRandomClubs(allClubs, 10);
        setClubs(randomClubs);
      } catch (error) {
        console.error('클럽 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    loadData();
  }, []);

  return (
    <section className="px-4 mt-6 space-y-3">
      {/* 헤더: 제목 + 전체보기 */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 tracking-tight">
          동아리 둘러보기
        </h2>
        <SeeAllButton navigateTo="/clubs" />
      </div>

      {/* 캐러셀 */}
      <div className="flex overflow-x-auto gap-3 scrollbar-hide">
      {clubs.map((club) => (
        <ClubCard
          key={club.clubId}
          clubId={club.clubId}
          imageUrl={club.profileImageUrl}
          category={club.clubType}
          name={club.clubName}
        />
      ))}
    </div>
    </section>
  );
};

export default ClubPreviewCarousel;