import React from 'react';
import TypeChip from '../../ui/Chip/Chip_type';
import type { Club } from '../../../types/club';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  if (!club) return null;

  const { profileImageUrl, clubType, clubName } = club;

  return (
    <div className="w-[120px] h-[156px] rounded-[13.41px] bg-gray-50 px-2 pt-3 pb-4 flex flex-col items-center justify-between">
      {/* 동아리 프로필 이미지 */}
      <img
        src={profileImageUrl}
        alt={`${clubName} profile`}
        className="w-[80px] h-[80px] rounded-full border border-gray-100 border-[1.12px] object-cover"
      />

      {/* 동아리 분류 뱃지 */}
      <TypeChip size="regular">{clubType}</TypeChip>

      {/* 동아리명 */}
      <p className="w-[104px] h-[18px] text-center truncate text-[14px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em]">
        {clubName}
      </p>
    </div>
  );
};

export default ClubCard;