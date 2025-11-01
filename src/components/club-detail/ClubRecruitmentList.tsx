// src/components/club-detail/ClubRecruitmentList.tsx
import React from 'react';
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
import { mockRecruitments } from '../../mocks/mockRecruitments';
import type { Recruitment } from '../../types/recruit';

interface ClubRecruitmentListProps {
  clubId: number;
}

const ClubRecruitmentList = ({ clubId }: ClubRecruitmentListProps) => {
  // 1. RecruitmentPost → Recruitment 변환
  const recruitments: Recruitment[] = mockRecruitments
    .filter((r) => r.id % 3 === clubId % 3) // 💡 임의로 clubId 매칭 (개발용)
    .map((r) => ({
      recruitmentId: r.id,
      clubId: clubId,
      title: r.title,
      description: '',
      type: '정기모집',
      status: r.recruitmentStatus === 'end' ? '마감' : '모집중',
      dDay: r.dDay,
      postedDate: r.createdAt,
      viewCount: r.viewCount,
      saveCount: r.saveCount,
      thumbnailUrl: r.imageUrl,
      phoneNumber: '',
      email: '',
      startDate: '',
      endDate: '',
      url: '',
    }));

  if (recruitments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-[14px] leading-[135%] tracking-[-0.03em]">
        등록된 모집공고가 없습니다.
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-6 space-y-4">
      {recruitments.map((recruit) => (
        <RecruitmentListItem key={recruit.recruitmentId} recruitment={recruit} />
      ))}
    </div>
  );
};

export default ClubRecruitmentList;