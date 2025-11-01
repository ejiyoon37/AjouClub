// src/components/club-detail/ClubRecruitmentList.tsx

import React, { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../lib/axios'; // (수정) axios import
import RecruitmentListItem from '../common/Card/Card_recruitment _listitem';
// (수정) API 상세 타입 및 ApiResponse, 헬퍼 import
import type { Recruitment, ApiRecruitmentDetail, RecruitmentStatus, RecruitmentType } from '../../types/recruit';
import type { ApiResponse } from '../../types/club';
import { formatDate } from '../../utils/date'; // (새로 추가)

interface ClubRecruitmentListProps {
  clubId: number;
}

// (새로 추가) useRecruitmentDetail.ts의 계산 로직을 가져옴
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
// (여기까지 새로 추가)


const ClubRecruitmentList = ({ clubId }: ClubRecruitmentListProps) => {
  // (삭제) useParams
  // (수정) API가 객체를 반환하므로 배열이 아닌 단일 객체(or null)로 변경
  const [recruitment, setRecruitment] = useState<Recruitment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!clubId) return;

    const fetchRecruitments = async () => {
      setIsLoading(true); // (추가)
      try {
        // (수정) API가 객체를 반환하므로 <ApiResponse<ApiRecruitmentDetail>>로 타입 지정
        const response = await axios.get<ApiResponse<ApiRecruitmentDetail>>(`/api/recruitments/${clubId}`);
        const apiData = response.data.data;

        // (새로 추가) API 데이터를 프론트엔드 Recruitment 타입으로 매핑
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
          images: [], // (참고) 이 API는 이미지를 주지 않으므로 빈 배열
          status: calculateStatus(apiData.type, apiData.endDate),
          dDay: calculateDDay(apiData.endDate),
          isScrapped: false,
          scrapCount: 0, // (참고) API에 saveCount가 없습니다.
        };
        
        setRecruitment(mappedData); // (수정) 매핑된 단일 객체 저장

      } catch (error: any) {
        // (수정) 404 에러(공고 없음)는 정상 처리
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
      {/* (수정) 배열(.length) 대신 단일 객체(recruitment) 확인 */}
      {!recruitment ? (
        <div className="py-10 text-center text-gray-300 text-base font-medium leading-[1.35] tracking-[-0.03em]">
          등록된 모집 공고가 없습니다.
        </div>
      ) : (
        // (수정) 배열 map 대신 단일 항목 렌더링
        <div
          key={recruitment.recruitmentId}
          onClick={() => navigate(`/recruitments/${recruitment.recruitmentId}`)}
          className="cursor-pointer"
        >
          <RecruitmentListItem
            // (수정) 올바른 props 전달
            imageUrl={recruitment.images[0]} // 썸네일 (현재는 없으므로 undefined)
            recruitmentStatus={recruitment.status}
            dDay={recruitment.dDay}
            title={recruitment.title}
            // (참고) viewCount는 API에 없으므로 전달 X
            saveCount={recruitment.scrapCount} // (수정)
            postedDate={formatDate(recruitment.createdAt)} // (수정)
          />
        </div>
      )}
    </div>
  );
};

export default ClubRecruitmentList;