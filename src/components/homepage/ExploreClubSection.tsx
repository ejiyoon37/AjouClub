// src/pages/Homepage/ExploreClubSection.tsx

import { useEffect, useState } from 'react';
import { fetchAllClubs } from '../../Api/club';
import type { Club } from '../../types/club';
import ClubCard from '../common/Card/Card_Club';
import SeeAllButton from '../common/SeeAllBtn';

const getRandomClubs = (clubs: Club[], count: number): Club[] => {
  return clubs
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, count);
};

const ExploreClubSection = () => {
  const [randomClubs, setRandomClubs] = useState<Club[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const allClubs = await fetchAllClubs();
        const sampled = getRandomClubs(allClubs, 10);
        setRandomClubs(sampled);
      } catch (e) {
        console.error('클럽 정보 로드 실패', e);
      }
    };

    load();
  }, []);

  return (
    <section className="px-4 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">동아리 둘러보기</h2>
        <SeeAllButton navigateTo="/clubs" />
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {randomClubs.map((club) => (
          <ClubCard
            key={club.clubId}
            profileImageUrl={club.profileImageUrl}
            clubType={club.clubType}
            clubName={club.clubName}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreClubSection;