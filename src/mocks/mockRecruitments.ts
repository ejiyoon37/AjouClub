// src/mocks/mockRecruitments.ts

import type { RecruitmentPost } from "../Hooks/useRecruitments";

export const mockRecruitments: RecruitmentPost[] = [
  {
    id: 1,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: '💙 24-2 SWeat 신입 부원 모집 💙',
    recruitmentStatus: 'regular',
    dDay: 10,
    viewCount: 120,
    saveCount: 10,
  },
  {
    id: 2,
    imageUrl: "src/assets/img/AKO.jpg",
    title: '[마감임박] 나비야 밴드부에서 드러머 구합니다!',
    recruitmentStatus: 'd-day',
    dDay: 2,
    viewCount: 85,
    saveCount: 20,
  },
  {
    id: 3,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: '기독교 동아리 [JOY] 24-2학기 모집',
    recruitmentStatus: 'end',
    dDay: 0,
    viewCount: 40,
    saveCount: 5,
  },
  {
    id: 4,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: 'C.O.D.E. - 개발 동아리 2기 모집',
    recruitmentStatus: 'regular',
    dDay: 15,
    viewCount: 300,
    saveCount: 55,
  },
  {
    id: 5,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: 'SCAU에서 애니메이션 덕후 찾습니다!',
    recruitmentStatus: 'd-day',
    dDay: 1,
    viewCount: 75,
    saveCount: 12,
  },
  {
    id: 6,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: '수학 문제 풀이 동아리 [정답은 42]',
    recruitmentStatus: 'regular',
    dDay: 12,
    viewCount: 60,
    saveCount: 8,
  },
  {
    id: 7,
    imageUrl: 'src/assets/img/AKO.jpg',
    title: '🧁 베이킹 소모임 [오븐 속 이야기] 신입 모집',
    recruitmentStatus: 'regular',
    dDay: 5,
    viewCount: 90,
    saveCount: 14,
  },
];