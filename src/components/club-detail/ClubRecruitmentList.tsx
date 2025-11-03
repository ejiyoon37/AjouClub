// src/components/club-detail/ClubRecruitmentList.tsx

import { useNavigate } from 'react-router-dom';
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
import { formatDate } from '../../utils/date';
import { useRecruitmentDetail } from '../../Hooks/useRecruitmentDetail'; // (수정) 훅 임포트

interface ClubRecruitmentListProps {
  clubId: number;
}

const ClubRecruitmentList = ({ clubId }: ClubRecruitmentListProps) => {
  const navigate = useNavigate();
  
  // useRecruitmentDetail 훅을 사용
  const { data: recruitment, isLoading, error } = useRecruitmentDetail(clubId);

  // 로딩 상태 처리
  if (isLoading) return <p className="p-4 text-center">로딩 중...</p>;

  // 에러 상태 처리
  if (error) {
    return <p className="p-4 text-center text-red-500">모집 공고를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      
      {/* null을 반환하면 공고 없음 처리 */}
      {!recruitment ? (
        <div className="py-10 text-center text-gray-300 text-base font-medium leading-[1.35] tracking-[-0.03em]">
          등록된 모집 공고가 없습니다.
        </div>
      ) : (
        
        <div
          key={recruitment.recruitmentId}
          onClick={() => navigate(`/recruitments/${recruitment.clubId}`)}
          className="cursor-pointer"
        >
          <RecruitmentListItem
            imageUrl={recruitment.images[0]} 
            recruitmentStatus={recruitment.status}
            dDay={recruitment.dDay}
            title={recruitment.title}
            saveCount={recruitment.scrapCount} 
            postedDate={formatDate(recruitment.createdAt)} 
          />
        </div>
      )}
    </div>
  );
};

export default ClubRecruitmentList;