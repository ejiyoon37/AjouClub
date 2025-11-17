// src/components/common/Card/Card_recruitment _listitem.tsx

import { useQuery } from '@tanstack/react-query'; // [수정됨]
import axios from '../../../utils/axios'; // [수정됨]
import PeriodChip from '../../ui/Chip/Chip_period';
import DefaultImage from '../../../assets/img/Default_images.png'; 

interface RecruitmentListItemProps {
  // imageUrl: string | null | undefined; // [제거됨]
  recruitmentId: number; // [추가됨]
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  dDay?: number;
  title: string;
  viewCount?: number; 
  saveCount: number;
  postedDate: string; // "YYYY. MM. DD" 
}

// 카드 썸네일 API 호출 함수
const fetchListItemThumbnail = async (recruitmentId: number): Promise<string[]> => {
  try {
    const res = await axios.get<string[]>(
      `/api/recruitments/${recruitmentId}/images`
    );
    return res.data;
  } catch (error) {
    return [];
  }
};


const RecruitmentListItem = ({
  recruitmentId, 
  recruitmentStatus,
  dDay,
  title,
  viewCount,
  saveCount,
  postedDate,
}: RecruitmentListItemProps) => {


  const { data: thumbnailImages } = useQuery<string[], Error>({
    queryKey: ['recruitmentThumbnail', recruitmentId],
    queryFn: () => fetchListItemThumbnail(recruitmentId),
    staleTime: Infinity,
  });

  const thumbnailUrl = thumbnailImages?.[0] || DefaultImage;


  return (
    <div className="flex w-full bg-white p-4 gap-3 border-b border-gray-100">
      {/* 썸네일 이미지 */}
      <img
        src={thumbnailUrl} 
        alt={`${title} thumbnail`}
        className="w-[100px] h-[100px] object-cover rounded-[10px] border border-gray-100 flex-shrink-0"
        loading="lazy" // 리스트 아이템이므로 Lazy Loading 적용
        decoding="async"
      />


      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* 모집 기간 칩 */}
          <PeriodChip status={recruitmentStatus} dDay={dDay} size="medium" />

          {/* 모집공고 제목 */}
          <p className="mt-1 text-base font-medium text-gray-900 leading-[1.35] tracking-[-0.03em]">
            {title}
          </p>
        </div>

        {/* 조회/저장, 게시 날짜 (수정) */}
        <div className="flex justify-between items-center text-xs font-normal text-gray-300 leading-[1.4] tracking-[-0.02em]">
          <div className="flex gap-2">
            {/* viewCount가 있을 때만 표시 */}
            {viewCount !== undefined && <span>조회 {viewCount}</span>}
            <span>저장 {saveCount}</span>
          </div>
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  );
};
export default RecruitmentListItem