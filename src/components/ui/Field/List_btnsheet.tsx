import React from 'react';
import CheckIcon from '../../../assets/icon/icn_check_24-2.svg?react';


interface BottomSheetListItemProps {
  children: React.ReactNode; 
  isActive?: boolean;        
  onClick: () => void;       
}

const BottomSheetListItem = ({ 
  children, 
  isActive = false, 
  onClick 
}: BottomSheetListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full h-14 px-2 py-4 bg-white border-b border-gray-100"
    >
      <span 
        className={`
          text-base font-medium leading-[1.35] tracking-[-0.03em]
          ${isActive ? 'text-blue-400' : 'text-gray-800'}
        `}
      >
        {children}
      </span>
      
      {isActive && (
        <CheckIcon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
};
export default BottomSheetListItem