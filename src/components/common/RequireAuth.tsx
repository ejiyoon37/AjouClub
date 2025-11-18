// src/components/common/RequireAuth.tsx

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      
      const redirectTo = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${redirectTo}`, { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) {
    return null; 
  }

  return <>{children}</>;
};

export default RequireAuth;