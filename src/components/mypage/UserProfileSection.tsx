// src/components/MyPage/UserProfileSection.tsx

import { useAuthStore } from '../../stores/useAuthStore';
import { logout } from '../../api/auth';

interface UserProfileSectionProps {
  user: {
    name: string;
    email: string;
    profilePic: string;
  };
}

const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  const logoutState = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout(); // API 호출
    logoutState();  // Zustand 상태 초기화
    window.location.href = '/'; // 홈으로 이동
  };

  return (
    <section className="flex flex-col items-center py-8 px-6 bg-white">
      <img
        src={user.profilePic}
        alt="프로필 사진"
        className="w-[72px] h-[72px] rounded-full border border-gray-100 object-cover"
      />
      <p className="mt-4 text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
        {user.name}
      </p>
      <p className="mt-[2px] text-[14px] font-medium text-gray-300 leading-[135%] tracking-[-0.03em]">
        {user.email}
      </p>
      <button
        className="mt-2 text-[12px] font-medium underline text-gray-600 leading-[140%] tracking-[-0.03em]"
        onClick={handleLogout}
      >
        로그아웃하기
      </button>
    </section>
  );
};

export default UserProfileSection;