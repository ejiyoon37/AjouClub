import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheet from '../components/explore/BottomSheet';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import ClubCard from '../components/common/Card/Card_Club';
import useClubs from '../Hooks/useClubs';
import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';

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

  // ✅ MOCK 용으로 훅 연결 (필요 시 page, size도 전달 가능)
  const { clubs, isLoading, error } = useClubs({
    sort: sortOptionMap[sortOption],
    // page: 1,
    // size: 6,
  });

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

      {/* 클럽 카드 리스트 */}
      <main className="flex-grow px-4">
        <div className="grid grid-cols-3 gap-x-6 gap-y-5 w-fit mx-auto">
            {clubs.map((club) => (
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