// src/components/common/FilterSortBar.tsx
import React from 'react';
import icArrowDown from '../../assets/icon/ic-arrow-down-gray-24.svg';
import icFilter from '../../assets/icon/icn_filter_16.svg';

interface FilterSortBarProps {
  sortLabel: string; 
  onClickSort: () => void;
  onClickFilter: () => void;
}

const FilterSortBar = ({ sortLabel, onClickSort, onClickFilter }: FilterSortBarProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100">
      {/* 정렬 */}
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700" onClick={onClickSort}>
        <span>{sortLabel}</span>
        <img src={icArrowDown} alt="정렬 선택" className="w-4 h-4" />
      </button>

      {/* 필터 */}
      <button className="flex items-center gap-1 text-sm font-medium text-gray-300" onClick={onClickFilter}>
        <img src={icFilter} alt="필터 아이콘" className="w-4 h-4" />
        <span>필터</span>
      </button>
    </div>
  );
};

export default FilterSortBar;