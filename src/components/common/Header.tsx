import React from 'react';
import { useNavigate } from 'react-router-dom';


import LogoIcon from '../../assets/logo_typo.svg?react';
import ProfileIcon from '../../assets/icon/icn_person_gray_24.svg?react';
import SearchIcon from '../../assets/icon/icn_search_24-2.svg?react';



interface HeaderProps {
  variant: 'home' | 'page';
}


const Header = ({ variant }: HeaderProps) => {
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToMyPage = () => navigate('/mypage');
  const goToSearch = () => navigate('/search');

  return (
    <header className="flex items-center justify-between w-full h-12 px-4 bg-white border-b border-gray-100">
      {/* 왼쪽 로고 */}
      <button onClick={goToHome} aria-label="홈으로 가기">
        <LogoIcon />
      </button>

      {/* 오른쪽 아이콘 그룹 */}
      <div className="flex items-center gap-4">
        {variant === 'page' && (
          <button onClick={goToSearch} aria-label="검색 페이지로 가기">
            <SearchIcon className="w-6 h-6" />
          </button>
        )}
        <button onClick={goToMyPage} aria-label="마이페이지로 가기">
          <ProfileIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header