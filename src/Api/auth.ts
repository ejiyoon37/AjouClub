// src/api/auth.ts
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

export const loginWithGoogle = async (idToken: string) => {
  const res = await axios.post('/api/auth/google', { idToken });
  const accessToken = res.data.data.accessToken;
  localStorage.setItem('accessToken', accessToken); // 선택 저장 (아래 상태도 따로 저장함)
  return accessToken;
};

export const refreshAccessToken = async () => {
  const res = await axios.post('/api/auth/refresh'); // RT-쿠키로 자동 전송
  const newAccessToken = res.data.data.accessToken;
  localStorage.setItem('accessToken', newAccessToken);
  return newAccessToken;
};

export const logout = async () => {
  try {
    await axios.post('/api/auth/logout'); // RT-쿠키

    useAuthStore.getState().logout(); 
  } catch (err) {
    console.error('Logout 실패:', err);
  }
};

