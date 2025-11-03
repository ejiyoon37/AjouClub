// src/components/club-detail/ClubRecruitmentList.tsx

import React, { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios';
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
import type { Recruitment, ApiRecruitmentDetail, RecruitmentStatus, RecruitmentType } from '../../types/recruit';
import type { ApiResponse } from '../../types/club';
import { formatDate } from '../../utils/date';

interface ClubRecruitmentListProps {
  clubId: number;
}

const calculateDDay = (endDate: string | null): number => {
  if (!endDate) return 0;
  const today = new Date();
  const end = new Date(endDate);
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0 ? 0 : diffDays;
};

const calculateStatus = (
  type: RecruitmentType,
  endDate: string | null
): RecruitmentStatus => {
  if (type === '상시모집') return 'regular';
  if (!endDate) return 'regular';
  const dDay = calculateDDay(endDate);
  if (dDay === 0) return 'end';
  if (dDay <= 7) return 'd-day';
  return 'regular';
};


const ClubRecruitmentList = ({ clubId }: ClubRecruitmentListProps) => {

  const [recruitment, setRecruitment] = useState<Recruitment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!clubId) return;

    const fetchRecruitments = async () => {
      setIsLoading(true); // (추가)
      try {
        // API가 객체를 반환하므로 <ApiResponse<ApiRecruitmentDetail>>로 타입 지정
        const response = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${clubId}`);
        const apiData = response.data.data;

        // API 데이터를 프론트엔드 Recruitment 타입으로 매핑
        const mappedData: Recruitment = {
          recruitmentId: apiData.id,
          clubId: apiData.clubId,
          clubName: apiData.clubName,
          title: apiData.title,
          description: apiData.description,
          type: apiData.type,
          phoneNumber: apiData.phoneNumber,
          email: apiData.email,
          startDate: apiData.startDate,
          endDate: apiData.endDate,
          url: apiData.url,
          createdAt: apiData.createdAt,
          images: [], // API는 이미지 안줌
          status: calculateStatus(apiData.type, apiData.endDate),
          dDay: calculateDDay(apiData.endDate),
          isScrapped: false,
          scrapCount: 0, // API에 saveCount가 없습니다.
        };
        
        setRecruitment(mappedData); // 매핑된 단일 객체 저장

      } catch (error: any) {
        //  404 에러(공고 없음)는 정상 처리
        if (error.response && error.response.status === 404) {
          setRecruitment(null); // 공고 없음
        } else {
          console.error('Error fetching recruitments:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruitments();
  }, [clubId]);

  if (isLoading) return <p className="p-4 text-center">로딩 중...</p>;

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      
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
              imageUrl={recruitment.images[0]} // 썸네일 (현재는 없으므로 undefined)
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