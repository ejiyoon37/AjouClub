// src/components/recruit-detail/RecruitmentMeta.tsx

import React from 'react';
import PeriodChip from '../ui/Chip/Chip_period';
import { formatDate } from '../../utils/date';

interface RecruitmentMetaSectionProps {
  title: string;
  status: 'regular' | 'd-day' | 'end';
  dDay?: number;
  createdAt: string; // ISO 형식 문자열
}

const RecruitmentMetaSection = ({
  title,
  status,
  dDay,
  createdAt,
}: RecruitmentMetaSectionProps) => {
  return (
    <section className="px-4 pt-6 pb-4 bg-white">
      {/* 모집 상태 뱃지 */}
      <div className="mb-2">
        <PeriodChip status={status} dDay={dDay} size="large" />
      </div>

      {/* 모집공고 제목 */}
      <h1 className="text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
        {title}
      </h1>

      {/* 게시일 */}
      <p className="mt-1 text-sm font-medium text-gray-400 leading-[135%] tracking-[-0.03em]">
        게시일 {formatDate(createdAt)}
      </p>
    </section>
  );
};

export default RecruitmentMetaSection;