export type SortType = 'latest' | 'saved' | 'deadline';

export const sortOptions: { key: SortType; label: string }[] = [
  { key: 'latest', label: '최근 게시순' },
  { key: 'saved', label: '저장순' },
  { key: 'deadline', label: '마감 임박순' },
];