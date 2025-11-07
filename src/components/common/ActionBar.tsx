//import React from 'react';

import ScrapBtn from '../ui/Button/ScrapBtn';
import CTABtn from '../ui/Button/CTABtn';

interface ActionBarProps {
  isActive: boolean;        
  scrapCount: number;       
  onScrapClick: () => void; 
  onApplyClick: () => void; 
}


export const ActionBar = ({
  isActive,
  scrapCount,
  onScrapClick,
  onApplyClick,
}: ActionBarProps) => {
  return (

    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] flex items-center gap-2 p-2 bg-white border-t border-gray-100 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <ScrapBtn 
        count={scrapCount}
        isActive={isActive}
        onClick={onScrapClick}
      />
      
      {/* 오른쪽 신청하기 버튼 */}
      <div className="flex-grow">
      <CTABtn 
        isActive={isActive}
        onClick={onApplyClick}
        >
        신청하기
      </CTABtn>
      </div>

    </div>
  );
};

export default ActionBar;
