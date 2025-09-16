// src/pages/ExplorePage.tsx
import { useState } from 'react';
import RecruitmentExplore from './RecruitmentExplore';
import ClubExplore from './ClubExplore';
import TextBtn from '../components/ui/Button/TextBtn';
import SortBottomSheet from '../components/sort/SortBottomSheet';
import type { SortType } from '../components/sort/SortOption';
import { getSortLabel } from '../utils/getSortLabel';
import IcArrowDown from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import IcFilter from '../assets/icon/icn_filter_16.svg?react';

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<'recruit' | 'club'>('recruit');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('latest');

  const handleSelectSort = (value: SortType) => {
    setSortType(value);
    setIsSortOpen(false);
  };

  return (
    <div className="px-4 pt-6">
      {/* 탭 버튼 */}
      <div className="flex gap-4 mb-4">
        <TextBtn isActive={activeTab === 'recruit'} onClick={() => setActiveTab('recruit')}>
          모집 공고
        </TextBtn>
        <TextBtn isActive={activeTab === 'club'} onClick={() => setActiveTab('club')}>
          동아리 둘러보기
        </TextBtn>
      </div>

      {/* 정렬 및 필터 바 */}
      <div className="flex justify-between items-center h-[56px] px-2 border-b border-gray-100 mb-4">
        <button
          onClick={() => setIsSortOpen(true)}
          className="flex items-center gap-1 text-sm font-medium text-gray-700"
        >
          <span>{getSortLabel(sortType)}</span>
          <IcArrowDown className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (activeTab === 'recruit') {
              window.location.href = '/filter/recruitment';
            } else {
              window.location.href = '/filter/club';
            }
          }}
          className="flex items-center gap-1 text-sm font-medium text-gray-300"
        >
          <IcFilter className="w-4 h-4" />
          <span>필터</span>
        </button>
      </div>

      {/* 해당 탭 콘텐츠 렌더링 */}
      {activeTab === 'recruit' ? (
        <RecruitmentExplore sortType={sortType} />
      ) : (
        <ClubExplore sortType={sortType} />
      )}

      {/* 정렬 바텀시트 */}
      {isSortOpen && (
        <SortBottomSheet
          selected={sortType}
          onSelect={handleSelectSort}
          onClose={() => setIsSortOpen(false)}
        />
      )}
    </div>
  );
};

export default ExplorePage;