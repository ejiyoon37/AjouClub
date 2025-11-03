import React from 'react';


import CloseIcon from '../../../assets/icon/icn_delete_24.svg?react';

interface FilterChipProps {
  children: React.ReactNode; // Chip 내부  텍스트
  onDelete: () => void;        // X 버튼을 클릭
}


const FilterChip = ({ children, onDelete }: FilterChipProps) => {
  return (
    <div
      className="inline-flex items-center gap-x-1 bg-gray-50 rounded-[6px] pl-2.5 pr-1 py-1"
    >
      {/* 텍스트 부분 */}
      <span className="text-xs font-medium text-gray-500 leading-[1.4] tracking-[-0.03em]">
        {children}
      </span>
      
      {/* X 버튼 부분 */}
      <button 
        onClick={onDelete} 
        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Remove filter" 
      >
        <CloseIcon className="w-3.5 h-3.5 text-gray-500" />
      </button>
    </div>
  );
};

export default FilterChip

