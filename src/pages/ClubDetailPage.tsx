import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import ClubInfoSection from '../components/club-detail/ClubInfoSection';
import ClubDetailTab from '../components/club-detail/ClubDetailTab';
import ClubRecruitmentList from '../components/club-detail/ClubRecruitmentList';
import ClubDescription from '../components/club-detail/ClubDescription';
// import { useClubDetail } from '../Hooks/useClubDetails';
import { mockClubs } from '../mocks/mockClubs';

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const [selectedTab, setSelectedTab] = useState<'모집공고' | '동아리 소개'>('모집공고');

  if (!clubId) {
    return <div className="p-4 text-red-500">유효하지 않은 접근입니다.</div>;
  }

  // ✅ 나중에 실제 API로 대체
  // const { data: club, isLoading, isError } = useClubDetail(Number(clubId));
  const club = mockClubs.find((c) => c.clubId === Number(clubId));

  if (!club) return <div className="p-4 text-red-500">동아리 정보를 불러오지 못했습니다.</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header variant="page" />
      <ClubInfoSection clubId={club.clubId} />
      <ClubDetailTab onTabChange={setSelectedTab} />
      {selectedTab === '모집공고' ? (
        <ClubRecruitmentList />
      ) : (
        <ClubDescription description={club.description ?? '소개 내용이 없습니다.'} />
      )}
    </div>
  );
};

export default ClubDetailPage;