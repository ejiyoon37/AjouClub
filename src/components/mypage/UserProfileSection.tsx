// src/components/mypage/UserProfileSection.tsx

import type { UserInfo } from '../../types/user'; 
import DefaultUserImage from '../../assets/img/user.png'; 

interface UserProfileSectionProps {
  user: UserInfo; 
}

const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  

  return (
    <section
      role="region"
      aria-label="사용자 프로필 영역"
      className="flex flex-col items-center py-8 px-6 bg-white"
    >
      <img
        src={user.profilePic || DefaultUserImage} 
        alt={`${user.name}의 프로필 사진`}
        className="w-[72px] h-[72px] rounded-full border border-gray-100 object-cover"
        />

      <p className="mt-4 text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
        {user.name}
      </p>

      <p className="mt-[2px] text-[14px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em]">
        {user.email}
      </p>

      
    </section>
  );
};

export default UserProfileSection;