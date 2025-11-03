// src/pages/Search/SearchResultPage.tsx

import React, { useState, useMemo } from 'react'; // (수정) useEffect, useState -> useState, useMemo
import { useNavigate, useLocation } from 'react-router-dom';

import SearchField from '../components/ui/Field/TextField_search';
import Header from '../components/common/Header';
import ClubCard from '../components/common/Card/Card_Club';

import type { Club } from '../types/club';

import useClubs from '../Hooks/useClubs';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [keyword, setKeyword] = useState(state?.keyword || '');


  const { clubs: allClubs, isLoading, error } = useClubs({});

  
  const results = useMemo(() => {
    if (!keyword.trim() || !allClubs) {
      return [];
    }
    const lowerCaseKeyword = keyword.toLowerCase().trim();
    return allClubs.filter(club =>
      club.clubName.toLowerCase().includes(lowerCaseKeyword)
          );
  }, [allClubs, keyword]); 

  const handleCardClick = (clubId: number) => {
    navigate(`/club/${clubId}`);
  };

  // useClubs 로딩 및 에러 처리
  if (isLoading) {
    return <div className="p-4 text-center">동아리 목록 로딩 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <div className="px-4 py-2">
      {/* 상단 네비게이션 (오른쪽 아이콘 없이) */}
      <Header variant={'home'} />

      {/* 검색 필드 */}
      <div className="mt-4">
        <SearchField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disableFocusNavigate={true} 
        />
      </div>

      {/* 결과 리스트 */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {results.length > 0 ? (
          results.map((club) => (
            <div key={club.clubId} onClick={() => handleCardClick(club.clubId)}>
              <ClubCard club={club} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-2 mt-20 h-[300px]">
            <p className="text-[18px] font-semibold text-gray-700 leading-[135%] tracking-[-0.03em] text-center">
              검색 결과가 없어요..
            </p>
            <p className="text-[16px] font-medium text-gray-400 leading-[135%] tracking-[-0.03em] text-center mt-1">
              다른 검색어로 검색해 보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;