import React from 'react';
import PeriodChip from '../../ui/Chip/Chip_period';


interface RecruitmentListItemProps {
  imageUrl: string;
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  dDay?: number;
  title: string;
  viewCount: number;
  saveCount: number;
  postedDate: string; // "YYYY. MM. DD" 
}


const RecruitmentListItem = ({
  imageUrl,
  recruitmentStatus,
  dDay,
  title,
  viewCount,
  saveCount,
  postedDate,
}: RecruitmentListItemProps) => {
  return (
    <div className="flex w-full bg-white p-4 gap-3 border-b border-gray-100">
      {/* 썸네일 이미지 */}
      <img
        src={imageUrl}
        alt={`${title} thumbnail`}
        className="w-[100px] h-[100px] object-cover rounded-[10px] border border-gray-100 flex-shrink-0"
      />


      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* 모집 기간 칩 */}
          <PeriodChip status={recruitmentStatus} dDay={dDay} size="medium" />

          {/* 모집공고 제목 */}
          <p className="mt-1 text-base font-medium text-gray-900 leading-[1.35] tracking-[-0.03em]">
            {title}
          </p>
        </div>

        {/* 조회/저장, 게시 날짜 */}
        <div className="flex justify-between items-center text-xs font-normal text-gray-300 leading-[1.4] tracking-[-0.02em]">
          <div className="flex gap-2">
            <span>조회 {viewCount}</span>
            <span>저장 {saveCount}</span>
          </div>
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};
export default RecruitmentListItem