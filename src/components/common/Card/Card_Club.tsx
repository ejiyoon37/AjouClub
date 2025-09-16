import React from 'react';
import TypeChip from '../../ui/Chip/Chip_type';
import type { ClubType } from '../../../types/club'; // ClubType 타입 가져오기

interface ClubCardProps {
  clubId: number;
  imageUrl: string;
  category: ClubType;
  name: string;
}

const ClubCard = ({ clubId, imageUrl, category, name }: ClubCardProps) => {
  return (
    <div className="w-[120px] h-[156px] rounded-[13.41px] bg-gray-50 px-2 pt-3 pb-4 flex flex-col items-center gap-2">
      {/* 프로필 이미지 */}
      <img
        src={imageUrl}
        alt={`${name} profile`}
        className="w-[80px] h-[80px] rounded-full border border-gray-100 object-cover"
      />

      {/* 동아리 분류 뱃지 */}
      <TypeChip size="regular">{category}</TypeChip>

      {/* 동아리명 */}
      <p className="text-[14px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em] text-center w-[104px] h-[18px] truncate">
        {name}
      </p>
    </div>
  );
};

export default ClubCard;