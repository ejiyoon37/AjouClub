// src/pages/LoginPage.tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../utils/axios';
import { setAccessToken } from '../utils/axios';
import { useAuthStore } from '../stores/useAuthStore';

import LogoImage from '../assets/logo_typo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  // 리디렉션 경로 파싱: 없으면 기본값은 "/"
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post('/api/auth/google', {
        idToken: credentialResponse.credential,
      });

      const { accessToken, user } = res.data;

      // axios 헤더 및 상태 저장
      setAccessToken(accessToken);
      setAuth({
        isLoggedIn: true,
        accessToken,
        user,
      });

      // 로그인 후 원래 가려던 경로로 이동
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-white">
      <p className="text-[18px] font-medium text-[#5A6167] leading-[135%] tracking-[-3%] mb-2">
        아주대학교 동아리를 담은
      </p>

      <img src={LogoImage} alt="aClub logo" className="w-[215px] h-[54px] mb-16" />

      <div className="flex flex-col items-center gap-3 mt-8">
        {/* 말풍선 + 꼬리 */}
        <div className="relative flex flex-col items-center">
          <div className="bg-[#5A6167] text-white text-[14px] font-medium leading-[135%] tracking-[-0.03em] px-4 py-2 rounded-md">
            간편하게 로그인해보세요!
          </div>
          <div
            className="w-[19.92px] h-[17.25px] bg-[#5A6167] rotate-180 mt-[-2px]"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* 구글 로그인 버튼 */}
        <div className="w-[343px] h-[56px]">
          <GoogleLogin onSuccess={handleSuccess} onError={() => alert('로그인 실패')} useOneTap auto_select />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;