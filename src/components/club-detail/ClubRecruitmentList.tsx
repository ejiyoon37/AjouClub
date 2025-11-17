// src/components/club-detail/ClubRecruitmentList.tsx

import { useNavigate } from 'react-router-dom';
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
import { formatDate } from '../../utils/date';
import { useRecruitmentDetail } from '../../Hooks/useRecruitmentDetail'; 
import PrimaryBtn from '../ui/Button/PrimaryBtn'; 

interface ClubRecruitmentListProps {
  clubId: number;
  isAdmin?: boolean; 
}

const ClubRecruitmentList = ({ clubId, isAdmin = false }: ClubRecruitmentListProps) => {
  const navigate = useNavigate();
  
  const { data: recruitments, isLoading, error } = useRecruitmentDetail(clubId);

  // 로딩 상태 처리
  if (isLoading) return <p className="p-4 text-center">로딩 중...</p>;

  // 에러 상태 처리
  if (error) {
    return <p className="p-4 text-center text-red-500">모집 공고를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div className="flex flex-col">
      
      {/*  관리자 전용 '공고 작성하기'*/}
      {isAdmin && (
        <div className="px-4 py-4 border-b border-gray-100">
          <PrimaryBtn 
            isActive={true} 
            onClick={() => navigate(`/admin/clubs/${clubId}/recruitments/new`)}
            className="w-full"
          >
            공고 작성하기
          </PrimaryBtn>
        </div>
      )}

      {/* 모집 공고 리스트 */}
      <div className="divide-y divide-gray-100">
        {!recruitments || recruitments.length === 0 ? (
          <div className="py-10 text-center text-gray-300 text-base font-medium leading-[1.35] tracking-[-0.03em]">
            등록된 모집 공고가 없습니다.
          </div>
        ) : (
          recruitments.map((recruitment) => (
            <div
              key={recruitment.recruitmentId}
              onClick={() => navigate(`/recruitments/${recruitment.recruitmentId}`)} 
              className="cursor-pointer"
            >
              <RecruitmentListItem
                recruitmentId={recruitment.recruitmentId} 
                recruitmentStatus={recruitment.status}
                dDay={recruitment.dDay}
                title={recruitment.title}
                saveCount={recruitment.scrapCount} 
                postedDate={formatDate(recruitment.createdAt)} 
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClubRecruitmentList;