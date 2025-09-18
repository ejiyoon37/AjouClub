import React from 'react';
import CheckIcon from '../../../assets/icon/icn_check_24-2.svg?react';


interface BottomSheetListItemProps {
  children: React.ReactNode; // 리스트 아이템에 표시될 텍스트
  isActive?: boolean;         // 활성화(선택된) 상태 여부
  onClick: () => void;        // 아이템을 클릭했을 때 실행될 함수
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
      {/* 텍스트 부분 */}
      <span 
        className={`
          text-base font-medium leading-[1.35] tracking-[-0.03em]
          ${isActive ? 'text-blue-400' : 'text-gray-800'}
        `}
      >
        {children}
      </span>
      
      {/* 체크 아이콘 부분 (활성화 상태일 때만 보임) */}
      {isActive && (
        <CheckIcon className="w-6 h-6 text-blue-400" />
      )}
    </button>
  );
};
export default BottomSheetListItem