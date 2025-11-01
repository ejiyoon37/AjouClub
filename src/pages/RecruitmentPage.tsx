// src/pages/RecruitmentPage.tsx

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
  // (수정) useRecruitments 훅은 이제 API 연동됨
  const { posts, isLoading, error } = useRecruitments(); 
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('최근 게시순');

  const sortOptions: SortOption[] = ['최근 게시순', '저장순', '마감 임박순'];

  const handleSelectSort = (option: SortOption) => {
    setSortOption(option);
    setIsBottomSheetOpen(false);
  };

  // (새로 추가) 로딩/에러 처리
  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">오류 발생: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="page" />

      {/* ... (상단 탭 메뉴, 정렬 및 필터 바 동일) ... */}
      <nav className="flex gap-3 px-4 pt-2">
        <TextBtn isActive={true}>모집공고</TextBtn>
        <TextBtn isActive={false} onClick={() => navigate('/clubs')}>동아리 둘러보기</TextBtn>
      </nav>

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

      {/* 모집 공고 그리드 (수정) */}
      <main className="flex-grow px-4">
        <div className="grid grid-cols-3 gap-3">
          {posts.map((post) => (
            <RecruitmentCard
              key={post.recruitmentId} // (수정)
              recruitmentId={post.recruitmentId} // (수정)
              images={post.images} // (수정)
              title={post.title}
              status={post.status} // (수정)
              dDay={post.dDay}
              viewCount={post.viewCount} // (수정)
              scrapCount={post.scrapCount} // (수정)
              isScrappedInitially={post.isScrapped} // (수정)
            />
          ))}
        </div>
      </main>

      {/* ... (바텀시트 동일) ... */}
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