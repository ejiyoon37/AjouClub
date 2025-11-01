// src/components/club-detail/ClubInfoSection.tsx
import React from 'react';
import TypeChip from '../ui/Chip/Chip_type';
import LocationIcon from '../../assets/icon/icn_location_16.svg?react';
import PersonIcon from '../../assets/icon/icn_person_16.svg?react';
import WebIcon from '../../assets/icon/icn_sns_web.svg?react';
import InstaIcon from '../../assets/icon/icn_sns_insta.svg?react';
import type { Club } from '../../types/club';

interface ClubInfoSectionProps {
  club: Club;
}

const ClubInfoSection = ({ club }: ClubInfoSectionProps) => {
  return (
    <section className="px-4 pt-6 pb-4 bg-white">
      {/* 프로필 이미지 + 정보 */}
      <div className="flex items-center gap-3">
        <img
          src={club.profileImageUrl}
          alt="club logo"
          className="w-[64px] h-[64px] rounded-full border border-gray-100 object-cover"
        />
        <div className="mb-[6px]">
          <TypeChip size="medium">{club.clubType}</TypeChip>
        </div>
        <p className="text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
          {club.clubName}
        </p>
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 space-y-2">
        {/* <InfoRow icon={<LocationIcon />} label="동아리 방" value={club.room || '정보 없음'} />
        <InfoRow icon={<PersonIcon />} label="모집 대상" value={club.target || '정보 없음'} /> */}
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600">SNS</span>
          {club.contact?.homepageUrl && (
            <a href={club.contact.homepageUrl} target="_blank" rel="noopener noreferrer">
              <WebIcon />
            </a>
          )}
          {club.contact?.instagramUrl && (
            <a href={club.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstaIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClubInfoSection;

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600">{label}</span>
    <span className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-400">{value}</span>
  </div>
);