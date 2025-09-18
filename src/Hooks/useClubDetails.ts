// src/hooks/useClubDetail.ts

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import type { Club } from '../types/club';

const fetchClubDetail = async (clubId: number): Promise<Club> => {
  const res = await axios.get(`/api/club/${clubId}`);
  return res.data.data;
};

export const useClubDetail = (clubId: number): UseQueryResult<Club, Error> => {
  return useQuery<Club, Error>({
    queryKey: ['clubDetail', clubId],
    queryFn: () => fetchClubDetail(clubId),
    enabled: !!clubId,
  });
};