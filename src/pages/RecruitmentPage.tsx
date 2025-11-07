// src/pages/RecruitmentPage.tsx

import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Header from '../components/common/Header';
import TextBtn from '../components/ui/Button/TextBtn';
import BottomSheetListItem from '../components/ui/Field/List_btnsheet';
import BottomSheet from '../components/explore/BottomSheet';
import RecruitmentCard from '../components/common/Card/Card_recruitment';
import useRecruitments from '../Hooks/useRecruitments';
import type { Recruitment } from '../types/recruit';
import FilterChip from '../components/ui/Chip/Chip_filter'; 

import { useAuthStore } from '../stores/useAuthStore';
import { useMyPageData } from '../Hooks/useMypageData';


import SortIcon from '../assets/icon/ic-arrow-down-gray-24.svg?react';
import FilterIcon from '../assets/icon/icn_filter_16.svg?react';

type SortOption = '최근 게시순' | '저장순' | '마감 임박순';


// const reverseStatusMap: Record<string, string> = {
//   'soon': '모집중',
//   'regular': '상시 모집',
//   'end': '모집 마감',
// };

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { posts, isLoading: isPostsLoading, error } = useRecruitments(); // (수정) isLoading 이름 변경
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('최근 게시순');


  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { favorites, isLoading: isFavoritesLoading } = useMyPageData();


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


  const filterChips = [
    ...activeFilters.categories, 
    ...activeFilters.types, 
    ...activeFilters.statuses,
    ...(activeFilters.department && activeFilters.department !== '전체' ? [activeFilters.department] : [])
  ];
  const filterCount = filterChips.length;


  const handleRemoveFilter = (chipLabel: string) => {
    setActiveFilters((prev: any) => ({
      categories: prev.categories.filter((c: string) => c !== chipLabel),
      types: prev.types.filter((t: string) => t !== chipLabel),
      statuses: prev.statuses.filter((s: string) => s !== chipLabel),
      department: prev.department === chipLabel ? '' : prev.department,
    }));
  };


  const postsWithUserScrapStatus = useMemo(() => {
    if (!isLoggedIn || !favorites) return posts; // 로그인 안했으면 원본 반환
    
    // 즐겨찾기 목록을 Set으로 만들어 빠른 조회
    const favoriteIdSet = new Set(favorites.map(fav => fav.recruitmentId));
    
    return posts.map(post => ({
      ...post,
      isScrapped: favoriteIdSet.has(post.recruitmentId), // 실제 스크랩 상태 반영
    }));
  }, [posts, favorites, isLoggedIn]);
 

  const sortedAndFilteredPosts = useMemo(() => {
    const filtered = postsWithUserScrapStatus.filter(post => { // (수정)
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
  }, [postsWithUserScrapStatus, sortOption, activeFilters]); // (수정)


  // 로딩 상태
  const isLoading = isPostsLoading || (isLoggedIn && isFavoritesLoading);

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
                clubId={post.clubId}
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