import { useNavigate } from 'react-router-dom';
import type { ManagedClub } from '../../types/user';
import DefaultImage from '../../assets/img/Default_images.png';
import ArrowRightIcon from '../../assets/icon/ic-arrow-right-16.svg?react'; // 화살표 아이콘 필요

interface ManagedClubItemProps {
  club: ManagedClub;
}

const ManagedClubItem = ({ club }: ManagedClubItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/clubs/${club.clubId}`)}
      className="w-full flex items-center justify-between bg-gray-50 rounded-[10px] p-[12px] gap-2"
      // [이미지 7 참고] Padding: 12px, Gap: 8px, Radius: 10px, Color: gray50
    >
      <div className="flex items-center gap-3">
        {/* [이미지 9 참고] 프로필 이미지: 48x48, Border 1px gray100 */}
        <img
          src={club.logoUrl || DefaultImage}
          alt={club.clubName}
          className="w-[48px] h-[48px] rounded-full border border-gray-100 object-cover"
        />
        
        {/* [이미지 8 참고] 동아리 이름: body01_sb (16px, SemiBold, gray800) */}
        <span className="text-[16px] font-semibold text-gray-800 leading-[135%] tracking-[-0.03em]">
          {club.clubName}
        </span>
      </div>

      {/* 우측 화살표 (디자인상 존재한다면) */}
      <ArrowRightIcon className="w-4 h-4 text-gray-400" />
    </button>
  );
};

export default ManagedClubItem;