// src/api/auth.ts
import axios from '../utils/axios';
import { useAuthStore } from "../stores/useAuthStore";

export const loginWithGoogle = async (idToken: string): Promise<string> => {
  const res = await axios.post('/api/auth/google', { idToken });
  
  const accessToken = res.data.accessToken; 
  
  if (!accessToken) {
    throw new Error('Access token is missing in the response');
  }
  
  return accessToken;
};

export const refreshAccessToken = async (): Promise<string> => {
  const res = await axios.post('/api/auth/refresh');
  const newAccessToken = res.data.accessToken;
  return newAccessToken;
};

export const logout = async () => {
  try {
    await axios.post('/api/auth/logout');
    useAuthStore.getState().logout();
  } catch (err) {
    console.error('Logout 실패:', err);
  }
};