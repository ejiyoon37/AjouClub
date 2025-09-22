// src/components/MyPage/UserProfileSection.tsx

import { useAuthStore } from '../../stores/useAuthStore';
import { logout as requestLogout } from '../../api/auth';

interface UserProfileSectionProps {
  user: {
    name: string;
    email: string;
    profilePic?: string; // optional 처리
  };
}

const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await requestLogout(); // API 호출
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    }

    logout(); // Zustand 상태 초기화
    window.location.href = '/'; // 홈으로 이동
  };

  return (
    <section
      role="region"
      aria-label="사용자 프로필 영역"
      className="flex flex-col items-center py-8 px-6 bg-white"
    >
      <img
        src={user.profilePic}
        alt={`${user.name}의 프로필 사진`}
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