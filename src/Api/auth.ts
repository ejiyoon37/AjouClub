import axios from "axios";

export const loginWithGoogle = async (idToken: string) => {
  const res = await axios.post('/api/auth/google', { idToken });
  const accessToken = res.data.data.accessToken;
  localStorage.setItem('accessToken', accessToken); // 저장
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post('/api/auth/refresh'); // RT는 쿠키로 자동 전송됨
    const newAccessToken = res.data.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (e) {
    console.error('리프레시 실패', e);
    throw e;
  }
};

export const logout = async () => {
  await axios.post('/api/auth/logout');
  localStorage.removeItem('accessToken');
};