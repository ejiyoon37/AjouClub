// src/pages/ClubDetailPage.tsx

import { useState } from 'react';
import { useParams} from 'react-router-dom'; 
import Header from '../components/common/Header';
import ClubInfoSection from '../components/club-detail/ClubInfoSection';
import ClubDetailTab from '../components/club-detail/ClubDetailTab';
import ClubRecruitmentList from '../components/club-detail/ClubRecruitmentList';
import ClubDescription from '../components/club-detail/ClubDescription'; 
import { useClubDetail } from '../Hooks/useClubDetails'; 
import { useClubActivityImages } from '../Hooks/useClubActivityImages'; 
import { useAuthStore } from '../stores/useAuthStore'; // AuthStore import

const ClubDetailPage = () => {
  const { clubId } = useParams<{ clubId: string }>(); 
  const [selectedTab, setSelectedTab] = useState<'모집공고' | '동아리 소개'>('모집공고');
  
  //const navigate = useNavigate(); // 네비게이션
  const user = useAuthStore((state) => state.user); 

  const numericClubId = Number(clubId); 

  // 관리자 권한 확인 로직 (JWT payload 기반)
  // 유저가 있고 유저의 managedClubIds 배열에 현재 페이지의 numericClubId가 포함되어 있으면 관리자
  const isAdmin = !!(user && user.managedClubIds?.includes(numericClubId));

  if (!numericClubId) {
    return <div className="p-4 text-red-500">유효하지 않은 접근입니다.</div>;
  }

  const { data: club, isLoading: isClubLoading, isError: isClubError, error: clubError } = useClubDetail(numericClubId);
  const { data: activityImages, isLoading: isImagesLoading } = useClubActivityImages(numericClubId); 

  const isLoading = isClubLoading || isImagesLoading; 

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;

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
      
      {/* isAdmin prop 전달 */}
      <ClubInfoSection club={club} isAdmin={isAdmin} />
      
      <ClubDetailTab onTabChange={setSelectedTab} />
      
      {selectedTab === '모집공고' ? (
        <ClubRecruitmentList clubId={numericClubId} isAdmin={isAdmin} />
      ) : (
        <ClubDescription club={club} activityImages={activityImages} isAdmin={isAdmin} />
      )}
    </div>
  );
};

export default ClubDetailPage;