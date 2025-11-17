// src/api/user.ts

import axios from '../utils/axios';

export const getMyInfo = async () => {
  const res = await axios.get('/api/user/me');
  return res.data;
};

export const getFavoriteRecruitments = async () => {
  const res = await axios.get('/api/recruitments/favorites');
  return res.data;
};

export const logout = async () => {
  await axios.post('/logout');
};