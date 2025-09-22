import React from 'react';
import Header from '../components/common/Header';
import RecruitmentMetaSection from '../components/recruit-detail/RecruitmentMeta';
import RecruitmentImage from '../components/recruit-detail/RecruitmentImage';
import RecruitmentDescription from '../components/recruit-detail/RecruitmentDescription';
import RecruitmentApplyBar from '../components/recruit-detail/RecruitmentApplyBar';
// import { useParams } from 'react-router-dom';
// import { useRecruitmentDetail } from '../Hooks/useRecruitmentDetail';

const mockRecruitment = {
  id: 1,
  title: '💙 2025-2 SWeat 신입 부원 모집 💙',
  status: 'd-day' as 'd-day' | 'end' | 'regular',
  dDay: 2,
  description: `SWeat는 아주대학교 소프트웨어학과 중앙 동아리입니다. 
신입 부원을 상시 모집 중이며, 다양한 프로젝트와 커뮤니티 활동을 진행하고 있습니다.

- 모집 대상: 아주대 재학생
- 활동 장소: 소프트웨어학과 동아리방
- 지원 방법: 구글 폼 링크 클릭`,
  imageUrl: '/assets/clubPic/sweat.jpg',
  isScrapped: false,
  scrapCount: 36,
};

const RecruitmentDetailPage = () => {
  // ✅ 나중에 실제 API로 교체
  // const { id } = useParams();
  // const { data: recruitment, isLoading, isError } = useRecruitmentDetail(Number(id));

  const {
    title,
    status,
    dDay,
    description,
    imageUrl,
    isScrapped,
    scrapCount,
  } = mockRecruitment;

  const handleToggleScrap = () => {
    console.log('스크랩 토글');
  };

  const handleApplyClick = () => {
    console.log('신청하기 클릭됨');
  };

  return (
    <div className="bg-white min-h-screen pb-[80px]">
      <Header variant="page" />

      <RecruitmentMetaSection
        title={title}
        status={status}
        dDay={dDay}
        createdAt="2025-09-20"
      />

      <RecruitmentImage imageUrl={imageUrl} />

      <RecruitmentDescription description={description} />

      <RecruitmentApplyBar
        status={status}
        isScrapped={isScrapped}
        scrapCount={scrapCount}
        onToggleScrap={handleToggleScrap}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};

export default RecruitmentDetailPage;