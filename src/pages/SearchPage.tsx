import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchField from '../components/ui/Field/TextField_search';
import TopNav from '../components/common/TopNav';
const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search/result?query=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 상단 네비게이션 (오른쪽 화살표 없는 TopNav) */}
      <TopNav title="동아리 검색" />

      {/* 검색 필드 */}
      <div className="px-4 py-3">
        <SearchField
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Search') handleSearch();
          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;