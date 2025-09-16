// utils/getSortLabel.ts
import { sortOptions } from "../components/sort/SortOption";
import type { SortType } from "../components/sort/SortOption";
export const getSortLabel = (key: SortType) => {
  return sortOptions.find((opt) => opt.key === key)?.label || '';
};