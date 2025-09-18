import type { Club } from '../types/club';

export function mapClubFromApi(data: any): Club {
  return {
    clubId: data.id,
    clubName: data.name,
    clubType: data.clubType,
    profileImageUrl: data.logoUrl,
    description: data.description,
    contact: {
      instagramUrl: undefined,
      homepageUrl: undefined,
    },
  };
}