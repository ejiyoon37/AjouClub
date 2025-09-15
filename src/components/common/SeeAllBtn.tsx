import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowIcon from '../../assets/icon/ic_arrow_up_16.svg?react';


interface SeeAllButtonProps {
  navigateTo: string; // 클릭 시 이동할 경로
}


const SeeAllButton = ({ navigateTo }: SeeAllButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-1 p-2"
    >
      <span className="text-sm font-medium text-gray-300 leading-[1.35] tracking-[-0.03em]">
        전체보기
      </span>
      <ArrowIcon className="w-4 h-4 text-gray-300 -rotate-270" />
    </button>
  );
};
export default SeeAllButton