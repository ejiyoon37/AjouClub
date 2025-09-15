import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '../../assets/icon/icn_arrow_left.svg?react';


const TopNav = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/'); // 홈으로 이동

  return (
    <nav className="relative flex items-center justify-center w-full h-12 px-4 bg-white border-b border-gray-100">
      {/* 왼쪽 뒤로가기 버튼 */}
      <div className="absolute left-4">
        <button onClick={goToHome} aria-label="뒤로가기">
          <BackIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 중앙 제목 */}
      <h1 className="text-base font-semibold text-gray-700 leading-[1.35] tracking-[-0.03em]">
        필터
      </h1>
    </nav>
  );
};

export default TopNav