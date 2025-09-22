// src/mocks/fetchMockClubList.ts

import { mockClubs } from './mockClubs';
import type { ClubPreview } from '../types/club';

export const fetchMockClubList = async (
  page: number = 1,
  size: number = 6
): Promise<ClubPreview[]> => {
  const start = (page - 1) * size;
  const end = start + size;

  return new Promise((resolve) => {
    setTimeout(() => {
      const previews: ClubPreview[] = mockClubs.slice(start, end).map((club) => ({
        id: club.clubId,
        name: club.clubName,
        type: club.clubType,
        description: club.description || '',
        imageUrl: club.profileImageUrl,
        isScrappedInitially: false,
      }));
      resolve(previews);
    }, 300);
  });
};