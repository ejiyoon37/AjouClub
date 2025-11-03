// src/pages/SearchResultPage.tsx

import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import SearchField from '../components/ui/Field/TextField_search';
import TopNav from '../components/common/TopNav'; // (수정) Header -> TopNav
import ClubCard from '../components/common/Card/Card_Club';
// (삭제) RecruitmentCard, TextBtn

import useClubs from '../Hooks/useClubs';

import type { Club } from '../types/club';


const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getKeywordFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('query') || '';
  };

  const [keyword, setKeyword] = useState(getKeywordFromQuery());

  const { clubs: allClubs, isLoading: isClubsLoading } = useClubs({});


  const handleSearch = () => {
    if (!keyword.trim()) return;
    // 검색 시 URL 쿼리 파라미터 변경
    navigate(`/search/result?query=${encodeURIComponent(keyword.trim())}`);
  };

  const lowerCaseKeyword = keyword.toLowerCase().trim();

  // 동아리 필터링 로직 (name + description)
  const filteredClubs = useMemo(() => {
    if (!lowerCaseKeyword || !allClubs) return [];
    return allClubs.filter(
      (club) =>
        club.clubName.toLowerCase().includes(lowerCaseKeyword) ||
        (club.description &&
          club.description.toLowerCase().includes(lowerCaseKeyword))
    );
  }, [allClubs, lowerCaseKeyword]);


  const isLoading = isClubsLoading; 

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNav title="동아리 검색" />

      {/* 검색 필드 */}
      <div className="px-4 py-3">
        <SearchField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Search') handleSearch();
          }}
          disableFocusNavigate={true} 
        />
      </div>


      {/* 결과 리스트 */}
      <main className="flex-grow p-4 overflow-y-auto">
        {isLoading ? (
          <div className="text-center pt-20">검색 중...</div>
        ) : (
          <>
            
            {filteredClubs.length > 0 ? (
              <div className="grid grid-cols-3 gap-x-6 gap-y-5 w-fit mx-auto">
                {filteredClubs.map((club) => (
                  <ClubCard
                    key={club.clubId}
                    club={club}
                    variant="explore"
                  />
                ))}
              </div>
            ) : (
              <NoResultView />
            )}
          </>
        )}
      </main>
    </div>
  );
};

// 결과 없음 컴포넌트
const NoResultView = () => (
  <div className="flex flex-col items-center justify-center pt-20">
    <p className="text-[16px] font-semibold text-gray-500 leading-[1.35] tracking-[-0.03em] text-center">
      검색 결과가 없습니다.
    </p>
  </div>
);

export default SearchResultPage;