import { useMemo } from 'react';
import RecruitmentCard from '../components/common/Card/Card_recruitment';
import { mockRecruitments } from '../mocks/mockRecruitments';
import type { SortType } from '../components/sort/SortOption';

interface RecruitmentExploreProps {
  sortType: SortType;
}

const RecruitmentExplore = ({ sortType }: RecruitmentExploreProps) => {
  const sortedRecruitments = useMemo(() => {
    switch (sortType) {
      case '최신순':
        return [...mockRecruitments].sort((a, b) => b.postedAt - a.postedAt);
      case '저장순':
        return [...mockRecruitments].sort((a, b) => b.saveCount - a.saveCount);
      case '마감임박순':
        return [...mockRecruitments].sort((a, b) => a.dDay - b.dDay);
      default:
        return mockRecruitments;
    }
  }, [sortType]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{sortType}</span>
        <FilterButton />
      </div>
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 pb-6">
        {sortedRecruitments.map((item) => (
          <RecruitmentCard
            key={item.id}
            recruitmentId={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            recruitmentStatus={item.recruitmentStatus}
            dDay={item.dDay}
            viewCount={item.viewCount}
            saveCount={item.saveCount}
            isScrappedInitially={item.isScrappedInitially}
          />
        ))}
      </div>
    </>
  );
};

export default RecruitmentExplore;