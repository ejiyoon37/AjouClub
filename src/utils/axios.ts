// src/utils/axios.ts
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const customAxios = axios.create({
  baseURL: 'https://ajouclubserver.shop',
  withCredentials: true, // RT 쿠키 자동 포함
});

// 💡 accessToken 저장용 (Zustand 안에서 직접 접근 불가하므로 외부 모듈 사용)
let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// ✅ 요청 인터셉터: accessToken 자동 포함
customAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: 401 → refresh → 재요청
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 재시도 방지 플래그
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
        useAuthStore.getState().setAuth({
          isLoggedIn: true,
          accessToken: newAccessToken,
          user: useAuthStore.getState().user, // 그대로 유지
        });

        // 요청에 새 토큰 넣고 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return customAxios(originalRequest);
      } catch (refreshErr) {
        // refresh 실패 → 로그아웃 처리
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;