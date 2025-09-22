import type { Club } from "../types/club";
import cimg1 from '../assets/img/cat.png'
import cimg2 from '../assets/img/exclub.jpg'
import cimg3 from '../assets/img/clubLogo1.png'

export interface ClubPreview {
  id: number;
  name: string;
  type: '중앙동아리' | '소학회';
  description: string;
  imageUrl: string;
  isScrappedInitially?: boolean;
}


export const mockClubs: Club[] = [
  {
    clubId: 1,
    clubName: 'SWeat',
    clubType: '중앙동아리',
    profileImageUrl: cimg1,
    description: '아주대 SW중앙동아리로, 다양한 개발 프로젝트를 함께합니다.',
    contact: {
      instagramUrl: 'https://instagram.com/sweat',
      homepageUrl: 'https://sweat.ajou.ac.kr',
    },
  },
  {
    clubId: 2,
    clubName: 'JOY',
    clubType: '중앙동아리',
    profileImageUrl: cimg2,
    description: '기독교 신앙 기반의 교제와 나눔 활동을 합니다.',
    contact: {
      instagramUrl: 'https://instagram.com/joy_club',
    },
  },
  {
    clubId: 3,
    clubName: 'C.O.D.E.',
    clubType: '소학회',
    profileImageUrl: cimg3,
    description: '프론트엔드부터 백엔드까지 함께 공부하는 개발 소모임입니다.',
    contact: {},
  },
  {
    clubId: 4,
    clubName: 'SCAU',
    clubType: '소학회',
    profileImageUrl: cimg1,
    description: '애니메이션과 서브컬처에 관심 있는 분들 환영!',
    contact: {
      homepageUrl: 'https://scau.ajou.ac.kr',
    },
  },
  {
    clubId: 5,
    clubName: '정답은 42',
    clubType: '소학회',
    profileImageUrl: cimg2,
    description: '수학과 알고리즘을 함께 탐구하는 학술 동아리입니다.',
    contact: {},
  },
  {
    clubId: 6,
    clubName: '오븐 속 이야기',
    clubType: '소학회',
    profileImageUrl: cimg3,
    description: '베이킹을 좋아하는 사람들의 소소한 모임.',
    contact: {
      instagramUrl: 'https://instagram.com/ovenstory',
    },
  },
  {
    clubId: 7,
    clubName: 'AKO',
    clubType: '중앙동아리',
    profileImageUrl: cimg1,
    description: '아주대학교 대표 밴드 동아리 AKO!',
    contact: {
      homepageUrl: 'https://ako.ajou.ac.kr',
    },
  },
  {
    clubId: 8,
    clubName: '캣냥냥',
    clubType: '소학회',
    profileImageUrl: cimg2,
    description: '캣타워 대신 지식을 쌓는 고양이 덕후 모임.',
    contact: {},
  },
];