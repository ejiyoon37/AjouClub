// src/pages/RecruitmentPage.tsx

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import BottomSheet from '../components/explore/BottomSheet';
import RecruitmentCard from '../components/common/Card/Card_recruitment';
import useRecruitments from '../Hooks/useRecruitments';
import type { Recruitment } from '../types/recruit';
import FilterChip from '../components/ui/Chip/Chip_filter'; 

// 아이콘 import
import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';

type SortOption = '최근 게시순' | '저장순' | '마감 임박순';


const reverseStatusMap: Record<string, string> = {
  'soon': '모집중',
  'regular': '상시 모집',
  'end': '모집 마감',
};

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { posts, isLoading, error } = useRecruitments(); 
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('최근 게시순');

  // department 추가
  const [activeFilters, setActiveFilters] = useState(location.state?.filters || {
    categories: [],
    types: [],
    statuses: [],
    department: '',
  });

  const sortOptions: SortOption[] = ['최근 게시순', '저장순', '마감 임박순'];

  const handleSelectSort = (option: SortOption) => {
    setSortOption(option);
    setIsBottomSheetOpen(false);
  };

  // 필터 칩 및 개수 계산 (department 추가)
  const filterChips = [
    ...activeFilters.categories, 
    ...activeFilters.types, 
    ...activeFilters.statuses,
    ...(activeFilters.department && activeFilters.department !== '전체' ? [activeFilters.department] : [])
  ];
  const filterCount = filterChips.length;

  // 칩 삭제 핸들러 (department 추가)
  const handleRemoveFilter = (chipLabel: string) => {
    setActiveFilters((prev: any) => ({
      categories: prev.categories.filter((c: string) => c !== chipLabel),
      types: prev.types.filter((t: string) => t !== chipLabel),
      statuses: prev.statuses.filter((s: string) => s !== chipLabel),
      department: prev.department === chipLabel ? '' : prev.department,
    }));
  };

 
  const sortedAndFilteredPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      //'모집 상태' 필터링 
      if (activeFilters.statuses.length > 0) {
        const hasMatchingStatus = activeFilters.statuses.some((statusLabel: string) => {
          if (statusLabel === '모집중') return post.status === 'd-day'; 
          if (statusLabel === '모집 마감') return post.status === 'end';
          if (statusLabel === '상시 모집') return post.status === 'regular';
          return false;
        });
        if (!hasMatchingStatus) return false;
      }
      


      return true;
    });

    // 2. 정렬 (유지)
    const postsCopy = [...filtered];
    // ... (switch/case) ...
    const getSortPriority = (post: Recruitment) => {
      if (post.status === 'end') return Infinity; 
      if (post.status === 'regular') return 1000; 
      return post.dDay; 
    };
    switch (sortOption) {
      case '최근 게시순':
        return postsCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case '저장순':
        return postsCopy.sort((a, b) => b.scrapCount - a.scrapCount);
      case '마감 임박순':
        return postsCopy.sort((a, b) => getSortPriority(a) - getSortPriority(b));
      default:
        return postsCopy;
    }
  }, [posts, sortOption, activeFilters]); 


  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }
  if (error) {
     return <div className="p-4 text-center text-red-500">오류 발생: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header variant="page" />

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
          onClick={() => navigate('/recruitment/filter', { state: { filters: activeFilters } })}
        >
          <FilterIcon className="w-4 h-4" />
          <span className={`text-sm font-medium ${filterCount > 0 ? 'text-gray-700' : 'text-gray-300'}`}>
            필터 {filterCount > 0 && `(${filterCount})`}
          </span>
        </button>
      </div>

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

      <main className="flex-grow px-4 pt-4">
        {sortedAndFilteredPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {sortedAndFilteredPosts.map((post) => (
              <RecruitmentCard
                key={post.recruitmentId}
                recruitmentId={post.recruitmentId} 
                clubId={post.clubId} // (수정) clubId 추가
                images={post.images} 
                title={post.title}
                status={post.status} 
                dDay={post.dDay}
                viewCount={post.viewCount} 
                scrapCount={post.scrapCount} 
                isScrappedInitially={post.isScrapped} 
              />
            ))}
          </div>
        ) : (

          <div className="flex flex-col items-center justify-center pt-20">
            <p className="text-[16px] font-semibold text-gray-500 leading-[1.35] tracking-[-0.03em] text-center">
              해당하는 모집 공고가 없습니다.
            </p>
          </div>
        )}
      </main>

    </div>
  );
};

export default RecruitmentPage;