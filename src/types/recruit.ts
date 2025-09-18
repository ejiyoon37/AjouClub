export type RecruitmentType = '상시모집' | '수시모집';

export interface Recruitment {
  recruitmentId: number;
  clubId: number;
  title: string;
  description: string;
  type: RecruitmentType;
  phoneNumber: string;
  email: string;
  startDate: string; // e.g., '2025-09-14'
  endDate: string;
  url: string;

  // ✅ UI 표시용 필드
  thumbnailUrl: string;
  viewCount: number;
  saveCount: number;
  status: 'regular' | 'd-day' | 'end';
  dDay: number;
  postedDate: string; // 'YYYY. MM. DD' 형태로 가공된 것
}