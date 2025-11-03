// src/components/common/Card/Card_recruitment _listitem.tsx

import React from 'react';
import PeriodChip from '../../ui/Chip/Chip_period';
import DefaultImage from '../../../assets/img/Default_images.png'; // (새로 추가)

interface RecruitmentListItemProps {
  imageUrl: string | null | undefined; // (수정) null 또는 undefined 허용
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  dDay?: number;
  title: string;
  viewCount?: number; // (수정) 선택적(optional) props로 변경
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
        src={imageUrl || DefaultImage} 
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

        {/* 조회/저장, 게시 날짜 (수정) */}
        <div className="flex justify-between items-center text-xs font-normal text-gray-300 leading-[1.4] tracking-[-0.02em]">
          <div className="flex gap-2">
            {/* viewCount가 있을 때만 표시 */}
            {viewCount !== undefined && <span>조회 {viewCount}</span>}
            <span>저장 {saveCount}</span>
          </div>
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};
export default RecruitmentListItem