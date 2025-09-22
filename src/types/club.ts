export type ClubType = '중앙동아리' | '소학회';

export interface Club {
  clubId: number;
  clubName: string;
  clubType: '중앙동아리' | '소학회';
  profileImageUrl: string;
  description?: string;
  contact?: {
    instagramUrl?: string;
    homepageUrl?: string;
  };
}

export interface ClubPreview {
  id: number; // = clubId
  name: string;
  type: ClubType;
  description: string;
  imageUrl: string;
  isScrappedInitially?: boolean;
}