// src/pages/ClubDetailPage.tsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import ClubInfoSection from '../components/club-detail/ClubInfoSection';
import ClubDetailTab from '../components/club-detail/ClubDetailTab';
import ClubRecruitmentList from '../components/club-detail/ClubRecruitmentList';
import ClubDescription from '../components/club-detail/ClubDescription';
import { useClubDetail } from '../Hooks/useClubDetails'; // (수정)
// (삭제) mockClubs

const ClubDetailPage = () => {
  const { clubId } = useParams<{ clubId: string }>(); // (수정) 타입 명시
  const [selectedTab, setSelectedTab] = useState<'모집공고' | '동아리 소개'>('모집공고');

  const numericClubId = Number(clubId); // (새로 추가)

  if (!numericClubId) {
    return <div className="p-4 text-red-500">유효하지 않은 접근입니다.</div>;
  }

  // (수정) Mock 데이터 대신 실제 API 훅 사용
  const { data: club, isLoading, isError, error } = useClubDetail(numericClubId);

  // (삭제) mockClubs.find

  // (새로 추가) 로딩 및 에러 처리
  if (isLoading) {
    return <div className="p-4 text-center">동아리 정보를 불러오는 중...</div>;
  }

  if (isError || !club) {
    return (
      <div className="p-4 text-center text-red-500">
        동아리 정보를 불러오지 못했습니다. ({(error as Error)?.message})
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="page" />
      {/* (수정) 훅으로 불러온 club 데이터를 props로 전달 */}
      <ClubInfoSection club={club} />
      <ClubDetailTab onTabChange={setSelectedTab} />
      {selectedTab === '모집공고' ? (
        // (수정) clubId prop 전달
        <ClubRecruitmentList clubId={numericClubId} />
      ) : (
        // (수정) 훅으로 불러온 description 전달
        <ClubDescription description={club.mainActivities ?? club.description ?? '소개 내용이 없습니다.'} />
      )}
    </div>
  );
};

export default ClubDetailPage;