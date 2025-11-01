// src/pages/ClubExplorePage.tsx

import React, { useState, useMemo } from 'react'; // (수정) useMemo 추가
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheet from '../components/explore/BottomSheet';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import ClubCard from '../components/common/Card/Card_Club';
import useClubs from '../Hooks/useClubs';
import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';
// (새로 추가)
import type { Club } from '../types/club'; 

// 정렬 옵션 타입
type ClubSortOption = '최근 등록순' | '가나다 순';

const ClubExplorePage = () => {
  const navigate = useNavigate();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<ClubSortOption>('최근 등록순');

  const sortOptions: ClubSortOption[] = ['최근 등록순', '가나다 순'];

  const sortOptionMap: Record<ClubSortOption, 'recent' | 'alphabetical'> = {
    '최근 등록순': 'recent',
    '가나다 순': 'alphabetical',
  };

  // (수정) useClubs 훅 호출 (sort 파라미터는 훅 내부에서 무시됨)
  const { clubs, isLoading, error } = useClubs({
    sort: sortOptionMap[sortOption],
    // (참고) 필터링이 있다면 여기에 전달
  });

  // (새로 추가) useMemo를 사용한 클라이언트 측 정렬
  const sortedClubs = useMemo(() => {
    const clubsCopy = [...clubs];
    
    switch (sortOption) {
      case '가나다 순':
        // clubName (문자열) 기준 오름차순
        return clubsCopy.sort((a, b) => a.clubName.localeCompare(b.clubName));
      
      case '최근 등록순':
        // API가 createdAt을 안주므로 clubId 역순으로 대체 (ID가 높을수록 최신이라 가정)
        return clubsCopy.sort((a, b) => b.clubId - a.clubId); 
      
      default:
        return clubsCopy;
    }
  }, [clubs, sortOption]); // clubs나 sortOption이 바뀔 때만 재정렬

  // --- 🔽 실 API용 주석 보존 ---
  /*
  const { clubs, isLoading, error } = useClubs({
    sort: sortOptionMap[sortOption],
    type: filters.type,
    category: filters.category,
    isRecruiting: filters.isRecruiting,
    department: filters.department,
  });
  */

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="page" />

      {/* 상단 탭 메뉴 */}
      <nav className="flex gap-3 px-4 pt-2">
        <TextBtn isActive={false} onClick={() => navigate('/recruitment')}>모집공고</TextBtn>
        <TextBtn isActive={true}>동아리 둘러보기</TextBtn>
      </nav>

      {/* 정렬 및 필터 바 */}
      <div className="flex justify-between items-center p-4">
        <button className="flex items-center gap-1" onClick={() => setIsBottomSheetOpen(true)}>
          <span className="text-sm text-gray-700 font-medium">{sortOption}</span>
          <SortIcon className="w-4 h-4 -rotate-90 text-gray-700" />
        </button>
        <button 
          className="flex items-center gap-1"
          onClick={() => navigate('/clubs/filter')}
        >
          <FilterIcon className="w-4 h-4" />
          <span className="text-sm text-gray-300 font-medium">필터</span>
        </button>
      </div>

      {/* (수정) clubs.map -> sortedClubs.map */}
      <main className="flex-grow px-4">
        <div className="grid grid-cols-3 gap-x-6 gap-y-5 w-fit mx-auto">
            {sortedClubs.map((club) => (
            <ClubCard key={club.clubId} club={club} variant="explore" />
            ))}
        </div>
      </main>

      {/* 정렬 바텀시트 */}
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