import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../assets/icon/ic_arrow_left_24.svg?react';

interface TopNavProps {
  title: string;

}

const TopNav = ({ title}: TopNavProps) => {
  const navigate = useNavigate();

  // (수정) goToHome -> goBack, navigate('/') -> navigate(-1)
  const goBack = () => navigate(-1); // 브라우저의 '뒤로' 기능

  return (
    <nav className="relative flex items-center justify-center w-full h-12 px-4 bg-white border-b border-gray-100">
      {/* 왼쪽 뒤로가기 버튼 */}
      <div className="absolute left-4">
        {/* (수정) onClick={goToHome} -> onClick={goBack} */}
        <button onClick={goBack} aria-label="뒤로가기">
          <BackIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 중앙 제목 */}
      <h1 className="text-base font-semibold text-gray-700 leading-[1.35] tracking-[-0.03em]">
        {title}
      </h1>
  
    </nav>
  );
};

export default TopNav