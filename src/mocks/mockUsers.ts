import type { User } from '../types/user';
import profileImg from '../assets/img/user.png';

export const mockUser: User = {
  id: 1,
  name: '이지윤',
  email: 'jiyoon@ajou.ac.kr',
  profileImageUrl: profileImg,
  favorites: [
    {
      recruitmentId: 1,
      clubId: 101,
      title: '24-2 SWeat 부원 모집 💙',
      thumbnailUrl: '../assets/img/AKO.jpg',
    },
    {
      recruitmentId: 2,
      clubId: 101,
      title: 'ACM 대학생 프로그래밍 동아리',
      thumbnailUrl: '../assets/img/R_image.png',
    },
  ],
};

