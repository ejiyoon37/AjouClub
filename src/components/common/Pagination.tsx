import React from 'react';
import IcArrowUp16 from '../../assets/icon/ic-arrow-down-gray-24.svg?react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}
const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }: PaginationProps) => {
  const numberTextStyle = "font-sans font-medium text-sm leading-[1.35] tracking-[-0.03em] text-center";

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {/* Prev Button */}
      <button 
        onClick={onPrevPage} 
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50"
        aria-label="Previous Page"
      >
        <IcArrowUp16 className="transform rotate-0" />
      </button>

      {/* Page Number */}
      <div className="flex items-center gap-[6px]">
        <span className={`${numberTextStyle} text-gray-600`}>
          {currentPage}
        </span>
        <div className="w-px h-3 bg-gray-200" />
        <span className={`${numberTextStyle} text-gray-200`}>
          {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button 
        onClick={onNextPage} 
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50"
        aria-label="Next Page"
      >
        <IcArrowUp16 className="transform -rotate-180" />
      </button>
    </div>
  );
};

export default Pagination
