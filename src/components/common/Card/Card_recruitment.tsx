// RecruitmentCard.tsx
// import React, { useState } from 'react';
// import PeriodChip from '../../ui/Chip/Chip_period';

// import ScrapIconDefault from '../../../assets/icon/ScrapBtn_default-2.svg?react';
// import ScrapIconActive from '../../../assets/icon/ScrapBtn_activated.svg?react';

// import { addToFavorites } from '../../../Api/recruitment';
// import { removeFromFavorites } from '../../../Api/recruitment';

// interface RecruitmentCardProps {
//   recruitmentId: number;
//   imageUrl: string;
//   title: string;
//   recruitmentStatus: 'regular' | 'd-day' | 'end';
//   dDay?: number;
//   viewCount: number;
//   saveCount: number;
//   isScrappedInitially?: boolean;
// }

// const RecruitmentCard = ({
//   recruitmentId,
//   imageUrl,
//   title,
//   recruitmentStatus,
//   dDay,
//   viewCount,
//   saveCount: initialSaveCount,
//   isScrappedInitially = false,
// }: RecruitmentCardProps) => {
//   const [isScrapped, setIsScrapped] = useState(isScrappedInitially);
//   const [saveCount, setSaveCount] = useState(initialSaveCount);

//   const handleScrapClick = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       if (!isScrapped) {
//         await addToFavorites(recruitmentId);
//         setIsScrapped(true);
//         setSaveCount((prev) => prev + 1);
//       } else {
//         await removeFromFavorites(recruitmentId);
//         setIsScrapped(false);
//         setSaveCount((prev) => prev - 1);
//       }
//     } catch (error) {
//       console.error('스크랩 처리 중 오류:', error);
//     }
//   };

//   return (
//     <div className="w-full cursor-pointer group">
//       <div className="relative mb-2">
//         <img
//           className="w-full aspect-square object-cover rounded-lg border border-gray-100"
//           src={imageUrl}
//           alt={`${title} thumbnail`}
//         />
//         <button
//           onClick={handleScrapClick}
//           className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm"
//           aria-label="스크랩"
//         >
//           {isScrapped ? (
//             <ScrapIconActive className="w-5 h-5" />
//           ) : (
//             <ScrapIconDefault className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       <div>
//         <h3 className="font-medium text-gray-800 line-clamp-2 leading-[1.35] h-[38px] group-hover:underline">
//           {title}
//         </h3>
//         <div className="mt-1">
//           <PeriodChip status={recruitmentStatus} dDay={dDay} size="small" />
//         </div>
//         <div className="mt-2 text-xs font-normal text-gray-300 leading-[1.4] tracking-[-0.02em]">
//           <span>조회 {viewCount}</span>
//           <span className="ml-2">저장 {saveCount}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruitmentCard;

// RecruitmentCard.tsx

import React, { useState } from 'react';
import PeriodChip from '../../ui/Chip/Chip_period';

import ScrapIconDefault from '../../../assets/icon/ScrapBtn_default-2.svg?react';
import ScrapIconActive from '../../../assets/icon/ScrapBtn_activated.svg?react';

import { addToFavorites, removeFromFavorites } from '../../../Api/recruitment';

interface RecruitmentCardProps {
  recruitmentId: number;
  imageUrl: string;
  title: string;
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  dDay?: number;
  viewCount: number;
  saveCount: number;
  isScrappedInitially?: boolean;
}

const RecruitmentCard = ({
  recruitmentId,
  imageUrl,
  title,
  recruitmentStatus,
  dDay,
  viewCount,
  saveCount: initialSaveCount,
  isScrappedInitially = false,
}: RecruitmentCardProps) => {
  const [isScrapped, setIsScrapped] = useState(isScrappedInitially);
  const [saveCount, setSaveCount] = useState(initialSaveCount);

  const handleScrapClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (!isScrapped) {
        await addToFavorites(recruitmentId);
        setIsScrapped(true);
        setSaveCount((prev) => prev + 1);
      } else {
        await removeFromFavorites(recruitmentId);
        setIsScrapped(false);
        setSaveCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error('스크랩 처리 중 오류:', error);
    }
  };

  return (
    <div className="flex flex-col w-[109px] min-h-[202px] gap-2 bg-white">
      {/* 모집공고 이미지 + 스크랩 */}
      <div className="relative">
        <img
          className="w-[109px] h-[109px] object-cover rounded-[8px] border border-gray-100"
          src={imageUrl}
          alt={`${title} thumbnail`}
        />
        <button
          onClick={handleScrapClick}
          className="absolute top-2 right-2"
          aria-label="스크랩"
        >
          {isScrapped ? (
            <ScrapIconActive className="w-5 h-5" />
          ) : (
            <ScrapIconDefault className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 모집공고 제목 */}
      <h3 className="text-sm font-medium text-gray-800 leading-[1.35] tracking-[-0.03em] h-[38px] line-clamp-2">
        {title}
      </h3>

      {/* 모집 상태 뱃지 */}
      <div className="mt-1 flex justify-start">
        <PeriodChip status={recruitmentStatus} dDay={dDay} size="small" />
      </div>

      {/* 조회수 & 저장수 */}
      <div className="text-xs text-gray-300 font-normal leading-[1.4] tracking-[-0.02em]">
        <span>조회 {viewCount}</span>
        <span className="ml-2">저장 {saveCount}</span>
      </div>
    </div>
  );
};

export default RecruitmentCard;