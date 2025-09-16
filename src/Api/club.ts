// import axios from "axios";
// import type { Club } from "../types/club";
// const res = await axios.get('/api/club/all'); 

// // export interface Club {
// //   clubId: number;
// //   clubName: string;
// //   clubType: string;
// //   profileImageUrl: string;
// // }
// // export const fetchAllClubs = async (): Promise<Club[]> => {
// //   const res = await axios.get('/api/club/all');
// //   return res.data.data; 
// // };

import type { Club } from '../types/club';
import { mockClubs } from '../mocks/mockClubs';

export const fetchAllClubs = async (): Promise<Club[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClubs), 300);
  });
};
