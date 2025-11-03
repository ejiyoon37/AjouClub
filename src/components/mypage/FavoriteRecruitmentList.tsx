// src/components/mypage/FavoriteRecruitmentList.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FavoriteRecruitment } from '../../types/user'; 



interface Props {
  item: FavoriteRecruitment; 
}

const FavoriteRecruitmentList = ({ item }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recruitments/${item.recruitmentId}`);
  };

  return (
    <div
      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={item.thumbnailUrl}
        alt={item.title}
        className="w-[80px] h-[80px] rounded-md object-cover border border-gray-200"
      />
      <p className="text-[15px] font-medium text-gray-900 leading-[135%] tracking-[-0.03em]">
        {item.title}
      </p>
    </div>
  );
};

export default FavoriteRecruitmentList;