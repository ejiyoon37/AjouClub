export type ClubType = '중앙동아리' | '소학회';

export interface Club {
  clubId: number;
  clubName: string;
  clubType: ClubType;
  profileImageUrl: string;
  description?: string; 
  contact?: {
    instagramUrl?: string;
    homepageUrl?: string;
  };

}