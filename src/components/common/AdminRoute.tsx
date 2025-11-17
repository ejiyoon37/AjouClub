// src/components/common/AdminRoute.tsx
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const { isLoggedIn, user } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  }));
  const location = useLocation();
  const { clubId } = useParams<{ clubId: string }>(); // URL에서 clubId 가져오기

  // 1. 로그인 여부 확인
  if (!isLoggedIn || !user) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  // 2. 관리 권한 확인
  // 운영중인 동아리가 하나라도 있는지 확인 (기본 관리자 여부)
  const hasManagedClubs = user.managedClubIds && user.managedClubIds.length > 0;

  if (!hasManagedClubs) {
    alert('운영진 권한이 없습니다.');
    return <Navigate to="/" replace />;
  }

  // (URL에 clubId가 있는 경우) 해당 동아리의 관리자인지 확인
  if (clubId) {
    const isManagerOfThisClub = user.managedClubIds.includes(Number(clubId));
    if (!isManagerOfThisClub) {
      alert('해당 동아리의 관리자 권한이 없습니다.');
      return <Navigate to="/" replace />;
    }
  }

  // 통과 시 페이지 렌더링
  return children;
};

export default AdminRoute;