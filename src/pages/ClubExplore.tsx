// src/pages/ClubExplore.tsx
import ClubCard from '../components/common/Card/Card_Club';
import { mockClubs } from '../mocks/mockClubs';

const ClubExplore = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">전체 동아리</span>
        <button className="text-gray-400 text-sm">필터</button>
      </div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 pb-6">
        {mockClubs.map((club) => (
          <ClubCard
            key={club.clubId}
            clubId={club.clubId}
            imageUrl={club.profileImageUrl}
            name={club.clubName}
            category={club.clubType}
/>
        ))}
      </div>
    </>
  );
};

export default ClubExplore;