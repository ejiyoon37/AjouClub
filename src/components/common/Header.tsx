// src/components/common/Header.tsx

import { useNavigate } from 'react-router-dom';

import LogoIcon from '../../assets/logo_typo.svg?react';
import ProfileIcon from '../../assets/icon/icn_person_gray_24.svg?react';
import SearchIcon from '../../assets/icon/icn_search_24-2.svg?react';
// [추가] 뒤로가기 아이콘
import BackIcon from '../../assets/icon/ic_arrow_left_24.svg?react';

import { useAuthStore } from '../../stores/useAuthStore';

interface HeaderProps {
  // [수정] 'fix' 타입 추가
  variant: 'home' | 'page' | 'logoOnly' | 'fix';
  title?: string;      // fix용: 중앙 제목
  onSave?: () => void; // fix용: 저장 버튼 핸들러
  isSaveDisabled?: boolean; // (선택) 저장 버튼 비활성화 여부
}

const Header = ({ variant, title, onSave, isSaveDisabled = false }: HeaderProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  
  const goToHome = () => navigate('/');
  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/mypage');
    }
  };
  const goToSearch = () => navigate('/search');

  //  정보 수정 페이지용 헤더 
  if (variant === 'fix') {
    return (
      <header className="relative flex items-center justify-between w-full h-[54px] px-4 bg-white border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)} 
          aria-label="뒤로가기"
          className="flex items-center justify-center w-6 h-6"
        >
          <BackIcon />
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
          {title}
        </h1>
        <button
          onClick={onSave}
          disabled={isSaveDisabled}
          className={`
            px-3 py-2 rounded-[8px] 
            text-[16px] font-medium leading-[135%] tracking-[-0.03em]
            transition-colors
            ${isSaveDisabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-[#3168FF] hover:opacity-80'
            }
          `}
          style={{ fontFamily: 'Wanted Sans' }}
        >
          저장
        </button>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between w-full h-12 px-4 bg-white">
      <button onClick={goToHome} aria-label="홈으로 가기">
        <LogoIcon />
      </button>

      {variant !== 'logoOnly' && (
        <div className="flex items-center gap-4">
          {variant === 'page' && (
            <button onClick={goToSearch} aria-label="검색 페이지로 가기">
              <SearchIcon className="w-6 h-6" />
            </button>
          )}
          <button onClick={handleMyPageClick} aria-label="마이페이지로 가기">
            <ProfileIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;