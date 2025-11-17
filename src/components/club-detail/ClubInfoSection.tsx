// src/components/club-detail/ClubInfoSection.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 네비게이션 추가
import TypeChip from '../ui/Chip/Chip_type';
import LocationIcon from '../../assets/icon/icn_location_16.svg?react';
import PersonIcon from '../../assets/icon/icn_person_16.svg?react';
import WebIcon from '../../assets/icon/icn_sns_web.svg?react';
import InstaIcon from '../../assets/icon/icn_sns_insta.svg?react';
import EditIcon from '../../assets/icon/icon_edit_24.svg?react'; 

import type { Club } from '../../types/club';

interface ClubInfoSectionProps {
  club: Club;
  isAdmin?: boolean; 
}

const ClubInfoSection = ({ club, isAdmin = false }: ClubInfoSectionProps) => {
  const navigate = useNavigate();

  if (!club) return null;

  return (
    <section className="px-4 pt-6 pb-4 bg-white">
      {/* 프로필 이미지 + 정보 */}
      <div className="flex items-center gap-3">
        <img
          src={club.profileImageUrl || '/OnlyLogo.svg'}
          alt="club logo"
          className="w-[64px] h-[64px] rounded-full border border-gray-100 object-cover"
        />
        <div className="flex flex-col gap-1">
          <TypeChip size="medium">{club.clubType}</TypeChip>
          
          <div className="flex items-center gap-1">
            <p className="text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
              {club.clubName}
            </p>
            
            {/*  관리자 전용 동아리 정보 수정 버튼*/}
            {isAdmin && (
              <button 
                onClick={() => navigate(`/admin/clubs/${club.clubId}/edit`)}
                className="p-1"
                aria-label="동아리 정보 수정"
              >
                {/* 아이콘이 없다면 텍스트로라도 표시해주세요: ✏️ */}
                <EditIcon width={24} height={24} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ... (기존 상세 정보 코드 유지) ... */}
      <div className="mt-4 space-y-2">
        {club.location && (
          <InfoRow icon={<LocationIcon />} label="동아리 방" value={club.location} />
        )}
        {club.details && (
          <InfoRow icon={<PersonIcon />} label="모집 대상" value={club.details} />
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600">SNS</span>
          {club.clubUrl && (
            <a href={club.clubUrl} target="_blank" rel="noopener noreferrer">
              <WebIcon />
            </a>
          )}
          {club.instagramUrl && (
            <a href={club.instagramUrl} target="_blank" rel="noopener noreferrer">
              <InstaIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

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

export default ClubInfoSection;