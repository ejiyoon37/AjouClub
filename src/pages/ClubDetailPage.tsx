import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import ClubInfoSection from '../components/club-detail/ClubInfoSection';
import ClubDetailTab from '../components/club-detail/ClubDetailTab';
import ClubRecruitmentList from '../components/club-detail/ClubRecruitmentList';
import ClubDescription from '../components/club-detail/ClubDescription';
import { useClubDetail } from '../Hooks/useClubDetails';



const ClubDetailPage = () => {
  const { clubId } = useParams();
  const [selectedTab, setSelectedTab] = useState<'모집공고' | '동아리 소개'>('모집공고');

  if (!clubId) {
    return <div className="p-4 text-red-500">유효하지 않은 접근입니다.</div>;
  }

  const { data: club, isLoading, isError } = useClubDetail(Number(clubId));

  if (isLoading) return <div className="p-4">로딩 중...</div>;
  if (isError || !club) return <div className="p-4 text-red-500">동아리 정보를 불러오지 못했습니다.</div>;

  return (
  <div className="min-h-screen bg-white">
    {/* 페이지 헤더 */}
    <Header variant="page" />

    {/* Club Info에 clubId만 전달 */}
    <ClubInfoSection clubId={club.clubId} />

    {/* 탭 전환 */}
    <ClubDetailTab onTabChange={setSelectedTab} />

    {/* 콘텐츠 */}
    {selectedTab === '모집공고' ? (
      // ClubRecruitmentList는 그대로 사용 (clubId 내부 useParams 사용)
      <ClubRecruitmentList />
    ) : (
      // 소개글은 club.description 사용
      <ClubDescription description={club.description ?? '소개 내용이 없습니다.'} />
    )}
  </div>    
    );
};

export default ClubDetailPage;