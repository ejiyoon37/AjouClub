import React from 'react';
import TypeChip from '../../ui/Chip/Chip_type';
import type { Club } from '../../../types/club';
import { useNavigate } from 'react-router-dom';

interface ClubCardProps {
  club: Club;
  variant?: 'home' | 'explore';
}

const ClubCard = ({ club, variant = 'home' }: ClubCardProps) => {
  const { profileImageUrl, clubType, clubName } = club;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clubs/${club.clubId}`);
  };

  const isExplore = variant === 'explore';

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={`
        ${isExplore ? 'w-[109px] h-[147px] rounded-[12px] px-2 pt-3 pb-4' : 'w-[120px] h-[156px] rounded-[13.41px] px-2 pt-3 pb-4'}
        bg-gray-50 flex flex-col items-center justify-between
      `}
    >
      {/* 프로필 이미지 */}
      <img
        src={profileImageUrl}
        alt={`${clubName} profile`}
        className={`
          ${isExplore ? 'w-[72px] h-[72px]' : 'w-[80px] h-[80px]'}
          rounded-full border border-gray-100 object-cover
        `}
      />

      {/* 분류 Chip */}
      <TypeChip size="regular">{clubType}</TypeChip>

      {/* 동아리명 */}
      <p
        className={`
          ${isExplore ? 'text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-900 text-center w-full truncate' :
            'w-[104px] h-[18px] text-center truncate text-[14px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em]'}
        `}
      >
        {clubName}
      </p>
    </div>
  );
};

export default ClubCard;