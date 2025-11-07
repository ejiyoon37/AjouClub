// src/pages/ClubDetailPage.tsx

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import ClubInfoSection from '../components/club-detail/ClubInfoSection';
import ClubDetailTab from '../components/club-detail/ClubDetailTab';
import ClubRecruitmentList from '../components/club-detail/ClubRecruitmentList';
import ClubDescription from '../components/club-detail/ClubDescription'; 
import { useClubDetail } from '../Hooks/useClubDetails'; 
import { useClubActivityImages } from '../Hooks/useClubActivityImages'; 

const ClubDetailPage = () => {
  const { clubId } = useParams<{ clubId: string }>(); 
  const [selectedTab, setSelectedTab] = useState<'모집공고' | '동아리 소개'>('모집공고');

  const numericClubId = Number(clubId); 

  if (!numericClubId) {
    return <div className="p-4 text-red-500">유효하지 않은 접근입니다.</div>;
  }


  const { data: club, isLoading: isClubLoading, isError: isClubError, error: clubError } = useClubDetail(numericClubId);
  const { data: activityImages, isLoading: isImagesLoading } = useClubActivityImages(numericClubId); 

  const isLoading = isClubLoading || isImagesLoading; 

  if (isLoading) {
    return <div className="p-4 text-center">동아리 정보를 불러오는 중...</div>;
  }

  if (isClubError || !club) {
    return (
      <div className="p-4 text-center text-red-500">
        동아리 정보를 불러오지 못했습니다. ({(clubError as Error)?.message})
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header variant="page" />
      <ClubInfoSection club={club} />
      <ClubDetailTab onTabChange={setSelectedTab} />
      {selectedTab === '모집공고' ? (
        <ClubRecruitmentList clubId={numericClubId} />
      ) : (
       
        <ClubDescription club={club} activityImages={activityImages} />
      )}
    </div>
  );
};

export default ClubDetailPage;