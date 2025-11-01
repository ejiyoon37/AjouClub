// src/pages/ClubExplorePage.tsx

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheet from '../components/explore/BottomSheet';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import ClubCard from '../components/common/Card/Card_Club';
import useClubs from '../Hooks/useClubs';
import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';
import FilterChip from '../components/ui/Chip/Chip_filter'; 
import type { Club } from '../types/club'; 

type ClubSortOption = '최근 등록순' | '가나다 순';

const ClubExplorePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<ClubSortOption>('최근 등록순');

  // (수정) location.state에서 필터 값 가져오기
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>(
    location.state?.filters || {}
  );

  const sortOptions: ClubSortOption[] = ['최근 등록순', '가나다 순'];

  // (수정) useClubs 훅에 activeFilters 전달
  const { clubs, isLoading, error } = useClubs({
    sort: sortOption === '최근 등록순' ? 'recent' : 'alphabetical',
    ...activeFilters,
  });

  // (새로 추가) 필터 칩 생성 로직 (Figma: image_df7582.jpg)
  const filterChips = useMemo(() => {
    const chips = [];
    if (activeFilters.type) chips.push(activeFilters.type);
    if (activeFilters.category) chips.push(activeFilters.category);
    if (activeFilters.department) chips.push(activeFilters.department);
    if (activeFilters.isRecruiting) chips.push('모집중');
    return chips;
  }, [activeFilters]);

  const filterCount = filterChips.length;

  // (새로 추가) 필터 칩 삭제 핸들러
  const handleRemoveFilter = (chipLabel: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (prev.type === chipLabel) delete newFilters.type;
      if (prev.category === chipLabel) delete newFilters.category;
      if (prev.department === chipLabel) delete newFilters.department;
      if (chipLabel === '모집중') delete newFilters.isRecruiting;
      return newFilters;
    });
  };

  // (유지) useMemo (클라이언트 정렬)
  const sortedClubs = useMemo(() => {
    const clubsCopy = [...clubs];
    switch (sortOption) {
      case '가나다 순':
        return clubsCopy.sort((a, b) => a.clubName.localeCompare(b.clubName));
      case '최근 등록순':
        return clubsCopy.sort((a, b) => b.clubId - a.clubId); 
      default:
        return clubsCopy;
    }
  }, [clubs, sortOption]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="page" />

      <nav className="flex gap-3 px-4 pt-2">
        <TextBtn isActive={false} onClick={() => navigate('/recruitment')}>모집공고</TextBtn>
        <TextBtn isActive={true}>동아리 둘러보기</TextBtn>
      </nav>

      <div className="flex justify-between items-center p-4">
        <button className="flex items-center gap-1" onClick={() => setIsBottomSheetOpen(true)}>
          <span className="text-sm text-gray-700 font-medium">{sortOption}</span>
          <SortIcon className="w-4 h-4 -rotate-90 text-gray-700" />
        </button>
        <button 
          className="flex items-center gap-1"
          onClick={() => navigate('/clubs/filter', { state: { filters: activeFilters } })} 
        >
          <FilterIcon className="w-4 h-4" />
          {/* (수정) 필터 개수 표시 */}
          <span className={`text-sm font-medium ${filterCount > 0 ? 'text-gray-700' : 'text-gray-300'}`}>
            필터 {filterCount > 0 && `(${filterCount})`}
          </span>
        </button>
      </div>

      {/* (새로 추가) 활성 필터 칩 목록 (Figma: image_df7582.jpg) */}
      {filterCount > 0 && (
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {filterChips.map((label) => (
            <FilterChip 
              key={label} 
              onDelete={() => handleRemoveFilter(label)}
            >
              {label}
            </FilterChip>
          ))}
        </div>
      )}

      {/* (수정) 로딩/에러/결과 없음 처리 */}
      <main className="flex-grow px-4 pt-4">
        {isLoading ? (
          <div className="text-center pt-20">로딩 중...</div>
        ) : error ? (
          <div className="text-center pt-20 text-red-500">오류 발생: {error.message}</div>
        ) : sortedClubs.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-6 gap-y-5 w-fit mx-auto">
            {sortedClubs.map((club) => (
              <ClubCard key={club.clubId} club={club} variant="explore" />
            ))}
          </div>
        ) : (
          // (새로 추가) 필터링 결과 없음 (Figma: image_df7582.jpg)
          <div className="flex flex-col items-center justify-center pt-20">
            {/* (Figma: image_df0f8a.png 폰트 스타일과 동일) */}
            <p className="text-[16px] font-semibold text-gray-500 leading-[1.35] tracking-[-0.03em] text-center">
              해당하는 동아리가 없습니다.
            </p>
          </div>
        )}
      </main>

      {/* (유지) 바텀시트 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <ul className="space-y-2">
          {sortOptions.map(option => (
            <li key={option}>
              <BottomSheetListItem
                isActive={sortOption === option}
                onClick={() => {
                  setSortOption(option);
                  setIsBottomSheetOpen(false);
                }}
              >
                {option}
              </BottomSheetListItem>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  );
};

export default ClubExplorePage;