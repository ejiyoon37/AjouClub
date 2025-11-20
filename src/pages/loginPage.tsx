// src/pages/loginPage.tsx

import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { setAccessToken } from '../utils/axios';
import { useAuthStore } from '../stores/useAuthStore';
import { loginWithGoogle } from '../api/auth';
import { getMyInfo } from '../api/user'; // 유저 정보 조회 API 추가 필요

import LogoImage from '../assets/logo_typo.svg';
import GoogleIcon from '../assets/icon/img_login_google.svg?react';

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const googleLoginRef = useRef<HTMLDivElement>(null);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      // 1. 구글 로그인으로 Access Token 발급
      const accessToken = await loginWithGoogle(credentialResponse.credential);
      
      // 2. Axios에 토큰 설정
      setAccessToken(accessToken);

      // 3. 발급받은 토큰으로 내 정보 조회 (/api/user/me)
      const userInfo = await getMyInfo();

      // 4. Store에 로그인 정보 저장 (토큰 + 유저정보)
      setAuth({ 
        isLoggedIn: true, 
        accessToken, 
        user: userInfo 
      });

      // 5. 메인페이지로 이동
      navigate('/', { replace: true });

    } catch (error: any) {
      console.error('Login failed:', error);
      const errorMessage = error?.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const handleCustomButtonClick = () => {
    // 숨겨진 GoogleLogin 버튼 클릭 트리거
    // GoogleLogin 컴포넌트가 렌더링한 버튼 찾기
    const googleButton = googleLoginRef.current?.querySelector('div[role="button"]') as HTMLElement;
    if (googleButton) {
      googleButton.click();
    } else {
      // 버튼이 아직 렌더링되지 않은 경우, 약간의 지연 후 재시도
      setTimeout(() => {
        const retryButton = googleLoginRef.current?.querySelector('div[role="button"]') as HTMLElement;
        if (retryButton) {
          retryButton.click();
        }
      }, 100);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-white">
      <p className="text-[18px] font-medium text-[#5A6167] leading-[135%] tracking-[-0.03em] mb-2">
        아주대학교 동아리를 담은
      </p>

      <img src={LogoImage} alt="aClub logo" className="w-[215px] h-[54px] mb-16" />

      <div className="flex flex-col items-center gap-3 mt-8">
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

        {/* 구글 로그인 버튼 - 숨김 처리 */}
        <div ref={googleLoginRef} className="absolute opacity-0 pointer-events-none" style={{ width: '343px', height: '56px' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('로그인 실패')}
            type="standard"
            theme="outline"
            size="large"
            shape="rectangular"
          />
        </div>

        {/* 커스텀 구글 로그인 버튼 */}
        <button
          onClick={handleCustomButtonClick}
          className="w-[343px] h-[56px] rounded-[8px] bg-[#E8E8E8] flex items-center justify-center gap-[6px] px-2 py-2 hover:bg-[#DDDDDD] transition-colors"
        >
          <GoogleIcon className="w-[19px] h-[19px] flex-shrink-0" />
          <span
            className="text-[16px] font-semibold leading-[135%] tracking-[-0.03em] text-[#3F454A]"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            Google로 로그인하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;