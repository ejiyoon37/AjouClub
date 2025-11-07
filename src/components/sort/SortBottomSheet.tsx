//import React from 'react';
import type { SortType } from './SortOption';
import { sortOptions } from './SortOption';
import IcCheck from '../../assets/icon/icn_check_24-2.svg?react';

interface SortBottomSheetProps {
  selected: SortType;
  onSelect: (value: SortType) => void;
  onClose: () => void;
}

const SortBottomSheet = ({ selected, onSelect, onClose }: SortBottomSheetProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[254px] bg-white rounded-t-[20px] z-50 px-4 pt-5 pb-6">
      <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
      <h3 className="text-base font-medium text-gray-800 mb-6">정렬</h3>
      <div className="space-y-4">
        {sortOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => {
              onSelect(option.key);
              onClose(); 
            }}
            className="flex items-center justify-between w-full text-gray-800 text-base font-medium"
          >
            <span>{option.label}</span>
            {selected === option.key && <IcCheck className="w-4 h-4 text-blue-500" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBottomSheet;