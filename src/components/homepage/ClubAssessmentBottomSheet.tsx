// src/components/homepage/ClubAssessmentBottomSheet.tsx

import { useNavigate } from 'react-router-dom';
import CTABtn from '../ui/Button/CTABtn';
import DeleteIcon from '../../assets/icon/icn_delete_24.svg?react';

interface ClubAssessmentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClubAssessmentBottomSheet = ({ isOpen, onClose }: ClubAssessmentBottomSheetProps) => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    onClose();
    navigate('/assessment');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end transition-opacity duration-300"
      onClick={onClose}
    >
      {/* 바텀시트 콘텐츠 */}
      <div
        className="w-[375px] h-[246px] bg-white rounded-t-[30px] flex flex-col px-4 pt-6 pb-4 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          fontFamily: 'Wanted Sans',
          boxShadow: '0px -2px 20px 0px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* 닫기 버튼 (오른쪽 위) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="닫기"
        >
          <DeleteIcon className="w-6 h-6 text-gray-600" />
        </button>
        {/* 컨텐츠 */}
        <div className="flex flex-col space-y-2 flex-grow">
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
            className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-500 whitespace-pre-line"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            {`5가지 질문을 통해 취향을 진단하고,
자신에게 잘 맞는 동아리 분야를 확인해 보세요`}
          </p>
        </div>

        {/* 진단하러가기 버튼 */}
        <div className="mt-auto flex justify-center">
          <button
            onClick={handleStartAssessment}
            className="w-[343px] h-[48px] rounded-[8px] bg-[#3168FF] text-white text-[16px] font-semibold leading-[135%] tracking-[-0.03em] hover:bg-[#2C5EE6] transition-colors px-3 py-[10px]"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            진단하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubAssessmentBottomSheet;

