//import React from 'react';
import ScrapBtn from '../ui/Button/ScrapBtn';
import CTABtn from '../ui/Button/CTABtn';

type ChipStatus = 'regular' | 'd-day' | 'end';

interface RecruitmentApplyBarProps {
  status: ChipStatus;
  isScrapped: boolean;
  scrapCount: number;
  onToggleScrap: () => void;
  onApplyClick: () => void;
}

const RecruitmentApplyBar = ({
  status,
  isScrapped,
  scrapCount,
  onToggleScrap,
  onApplyClick,
}: RecruitmentApplyBarProps) => {
  const isRecruiting = status === 'regular' || status === 'd-day';

  return (
    <div className="w-full max-w-[420px] fixed bottom-0 left-1/2 -translate-x-1/2 z-10 border-t border-gray-100 bg-white px-4 pt-3 pb-6 flex items-center justify-between gap-2">
      <ScrapBtn
        count={scrapCount}
        isActive={isScrapped}
        onClick={onToggleScrap}
      />

      {/* CTA 버튼 */}
      <div className="flex-1">
        <CTABtn isActive={isRecruiting} onClick={onApplyClick}>
          {isRecruiting ? '신청하기' : '신청 마감'}
        </CTABtn>
      </div>
    </div>
  );
};

export default RecruitmentApplyBar;