// src/Api/logout.ts

import axios from "axios";

export const logout = async (): Promise<void> => {
  try {
    await axios.post('/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  }
};