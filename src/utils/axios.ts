// src/utils/axios.ts
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const customAxios = axios.create({
  baseURL: 'https://ajouclubserver.shop',
  withCredentials: true, // RT 쿠키 자동 포함
});

// accessToken 저장 변수
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// 요청 인터셉터
customAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios.post(
          'https://ajouclubserver.shop/api/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;
        
        setAccessToken(newAccessToken);
        
        // Store 업데이트 (User 정보는 유지)
        useAuthStore.getState().setAuth({
          isLoggedIn: true,
          accessToken: newAccessToken,
          user: useAuthStore.getState().user,
        });

        // 재요청 헤더 설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return customAxios(originalRequest);
      } catch (refreshErr) {
        // 리프레시 실패 시 로그아웃
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;