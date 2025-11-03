import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
//로그인 정상화
// const RequireAuth = ({ children }: Props) => {
//   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
//   const location = useLocation();

//   if (!isLoggedIn) {
//     const redirectTo = encodeURIComponent(location.pathname + location.search);
//     return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
//   }

//   return children;
// };

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = false; 
  return <>{children}</>;   
};

export default RequireAuth;