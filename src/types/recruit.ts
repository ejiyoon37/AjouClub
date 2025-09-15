export type RecruitmentType = '상시모집' | '수시모집';

export interface Recruitment {
  recruitmentId?: number; // optional for creation form
  clubId?: number;         // optional depending on context
  title: string;
  description: string;
  type: RecruitmentType;
  phoneNumber: string;
  email: string;
  startDate: string; // e.g., '2025-09-14'
  endDate: string;
  url: string;
}
