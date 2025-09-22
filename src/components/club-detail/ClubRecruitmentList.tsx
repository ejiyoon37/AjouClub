import React, { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../lib/axios'; // interceptor 적용된 axios 인스턴스
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
import type { Recruitment } from '../../types/recruit';
import { useNavigate } from 'react-router-dom';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

const ClubRecruitmentList = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!clubId) return;

    const fetchRecruitments = async () => {
      try {
        const response = await axios.get<ApiResponse<Recruitment[]>>(`/api/recruitments/${clubId}`);
        setRecruitments(response.data.data);
      } catch (error) {
        console.error('Error fetching recruitments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruitments();
  }, [clubId]);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {recruitments.length === 0 ? (
        <div className="py-10 text-center text-gray-300 text-base font-medium leading-[1.35] tracking-[-0.03em]">
          저장된 공고가 없습니다<br />관심있는 모집공고를 저장해 보세요!
        </div>
      ) : (
        recruitments.map((recruitment) => (
          <div
            key={recruitment.recruitmentId}
            onClick={() => navigate(`/recruitment/${recruitment.recruitmentId}`)}
            className="cursor-pointer"
          >
            <RecruitmentListItem
              imageUrl={recruitment.thumbnailUrl}
              recruitmentStatus={recruitment.status}
              dDay={recruitment.dDay}
              title={recruitment.title}
              viewCount={recruitment.viewCount}
              saveCount={recruitment.saveCount}
              postedDate={recruitment.postedDate}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ClubRecruitmentList;