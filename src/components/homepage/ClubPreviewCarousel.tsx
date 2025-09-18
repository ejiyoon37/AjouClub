import React, { useEffect, useState } from 'react';
//import { fetchAllClubs } from '../../Api/club'; // api 연결 시 수정
import { fetchAllClubs } from '../../api/useMockClubs';
import type { Club } from '../../types/club';
import ClubCard from '../common/Card/Card_Club';
import SeeAllButton from '../common/SeeAllBtn';

const getRandomClubs = (clubs: Club[], count: number): Club[] => {
  const shuffled = [...clubs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ClubPreviewCarousel = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allClubs = await fetchAllClubs();
        setClubs(getRandomClubs(allClubs, 6)); // 6개만 랜덤으로 보여주기
      } catch (error) {
        console.error('클럽 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    loadData();
  }, []);

  return (
    <section className="mt-6 py-12 bg-white">
      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">동아리 둘러보기</h2>
          <SeeAllButton navigateTo="/clubs" />
        </div>
      </div>
      <div className="pl-4 flex space-x-2 overflow-x-auto pb-2 -mt-2 scrollbar-hide">
        {clubs.map((club) => (
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
