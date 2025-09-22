import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import BottomSheet from '../components/explore/BottomSheet';
import RecruitmentCard from '../components/common/Card/Card_recruitment';
import useRecruitments from '../Hooks/useRecruitments';

// 아이콘 import
import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';

type SortOption = '최근 게시순' | '저장순' | '마감 임박순';

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const { posts, isLoading, error } = useRecruitments(); // ✅ mock 사용 중
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('최근 게시순');

  const sortOptions: SortOption[] = ['최근 게시순', '저장순', '마감 임박순'];

  const handleSelectSort = (option: SortOption) => {
    setSortOption(option);
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="page" />

      {/* 상단 탭 메뉴 */}
      <nav className="flex gap-3 px-4 pt-2">
        <TextBtn isActive={true}>모집공고</TextBtn>
        <TextBtn isActive={false} onClick={() => navigate('/clubs')}>동아리 둘러보기</TextBtn>
      </nav>

      {/* 정렬 및 필터 바 */}
      <div className="flex justify-between items-center p-4">
        <button className="flex items-center gap-1" onClick={() => setIsBottomSheetOpen(true)}>
          <span className="text-sm text-gray-700 font-medium">{sortOption}</span>
          <SortIcon className="w-4 h-4 -rotate-90 text-gray-700" />
        </button>
        <button 
          className="flex items-center gap-1"
          onClick={() => navigate('/recruitment/filter')}
        >
          <FilterIcon className="w-4 h-4" />
          <span className="text-sm text-gray-300 font-medium">필터</span>
        </button>
      </div>

      {/* 모집 공고 그리드 */}
      <main className="flex-grow px-4">
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post) => (
            <RecruitmentCard
              key={post.id}
              recruitmentId={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              recruitmentStatus={post.recruitmentStatus}
              viewCount={post.viewCount}
              saveCount={post.saveCount}
              dDay={post.dDay}
              isScrappedInitially={post.isScrappedInitially ?? false}
            />
          ))}
        </div>
      </main>

      {/* 정렬 옵션 바텀시트 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <ul className="space-y-2">
          {sortOptions.map(option => (
            <li key={option}>
              <BottomSheetListItem
                isActive={sortOption === option}
                onClick={() => handleSelectSort(option)}
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

export default RecruitmentPage;