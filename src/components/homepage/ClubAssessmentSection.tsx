// src/components/homepage/ClubAssessmentSection.tsx

import { useState } from 'react';
import ClubAssessmentBottomSheet from './ClubAssessmentBottomSheet';

const ClubAssessmentSection = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <section 
        className="mt-6 px-4 py-6 bg-white rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsBottomSheetOpen(true)}
      >
        <div className="space-y-3">
          {/* 질문 텍스트 */}
          <p 
            className="text-[12px] font-medium leading-[140%] tracking-[-0.03em] text-gray-300"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            어떤 동아리를 가입할지 고민되신다면?
          </p>

          {/* 제목 */}
          <h2 
            className="text-[18px] font-semibold leading-[135%] tracking-[-0.03em] text-gray-900"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            동아리 취향을 진단해 드려요!
          </h2>

          {/* 설명 텍스트 */}
          <p 
            className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-500"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            5가지 질문을 통해 취향을 진단하고, 자신에게 잘 맞는 동아리 분야를 확인해 보세요
          </p>

          {/* 진단하러 가기 버튼 */}
          <button
            className="w-full h-[48px] rounded-[8px] bg-[#3168FF] text-white text-[16px] font-semibold leading-[135%] tracking-[-0.03em] hover:bg-[#2C5EE6] transition-colors mt-4"
            style={{ fontFamily: 'Wanted Sans' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsBottomSheetOpen(true);
            }}
          >
            진단하러 가기
          </button>
        </div>
      </section>

      {/* 바텀시트 */}
      <ClubAssessmentBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
};

export default ClubAssessmentSection;

