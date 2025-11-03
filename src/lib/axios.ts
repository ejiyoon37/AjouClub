// src/lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const customAxios = axios.create({
  baseURL: 'https://ajouclubserver.shop', 
  withCredentials: true, 
});

// 요청마다 accessToken 붙이기
customAxios.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 401 응답 시 refresh 토큰으로 재시도
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          '/api/auth/refresh',
          {},
          { withCredentials: true } // 쿠키로 refreshToken 
        );

        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAuth({
          ...useAuthStore.getState(),
          accessToken: newAccessToken,
        });

        // accessToken 붙여서 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login'; // 강제 로그아웃
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;