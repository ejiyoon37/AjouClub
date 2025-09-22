import axios from "axios";

export const logout = async (): Promise<void> => {
  try {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
  }
};