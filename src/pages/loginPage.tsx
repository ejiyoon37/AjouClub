// src/pages/loginPage.tsx

import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { setAccessToken } from '../utils/axios';
import { useAuthStore } from '../stores/useAuthStore';
import { loginWithGoogle } from '../api/auth';
import { getMyInfo } from '../api/user';

import LogoImage from '../assets/logo_typo.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSuccess = async (credentialResponse: any) => {
    try {
      // 1. 구글 ID 토큰으로 서버에 인증 요청 → Access Token 발급
      // HTML 참고: POST /api/auth/google, body: { idToken: resp.credential }
      const accessToken = await loginWithGoogle(credentialResponse.credential);
      
      if (!accessToken) {
        throw new Error('Access token이 서버로부터 반환되지 않았습니다.');
      }

      // 2. Axios에 토큰 설정 (이후 모든 API 요청에 Authorization 헤더 추가)
      setAccessToken(accessToken);

      // 3. 발급받은 Access Token으로 내 정보 조회 (GET /api/user/me)
      const userInfo = await getMyInfo();

      if (!userInfo) {
        throw new Error('사용자 정보를 가져올 수 없습니다.');
      }

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

  const handleError = () => {
    alert('Google 로그인에 실패했습니다. 다시 시도해주세요.');
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

        {/* Google 기본 로그인 버튼 */}
        <div className="w-[343px] flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            type="standard"
            theme="outline"
            size="large"
            shape="rectangular"
            text="signin_with"
            useOneTap={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;