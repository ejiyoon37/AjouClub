export interface FavoriteRecruitment {
  recruitmentId: number;
  title: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string;
  favorites: FavoriteRecruitment[];
}

