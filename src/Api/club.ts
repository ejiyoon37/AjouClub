import axios from "axios";
const res = await axios.get('/api/club/all'); 

// export interface Club {
//   clubId: number;
//   clubName: string;
//   clubType: string; // "중앙동아리" | "소학회"
//   profileImageUrl: string;
// }

// export const fetchAllClubs = async (): Promise<Club[]> => {
//   const res = await axios.get('/api/club/all');
//   return res.data.data; 
// };

import type { Club } from '../types/club';
import { mockClubs } from '../mocks/mockClubs';

export const fetchAllClubs = async (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClubs), 300);
  });
};
