// src/components/recruit-detail/RecruitmentMeta.tsx

import { useState, useRef, useEffect } from 'react';
import PeriodChip from '../ui/Chip/Chip_period';
import { formatDate } from '../../utils/date';
import MenuIcon from '../../assets/icon/icn_menu_24.svg?react';

interface RecruitmentMetaSectionProps {
  title: string;
  status: 'regular' | 'd-day' | 'end';
  dDay?: number;
  createdAt: string; // ISO 형식 문자열
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const RecruitmentMetaSection = ({
  title,
  status,
  dDay,
  createdAt,
  isAdmin = false,
  onEdit,
  onDelete,
}: RecruitmentMetaSectionProps) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 액션시트 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsActionSheetOpen(false);
      }
    };

    if (isActionSheetOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isActionSheetOpen]);

  const handleEdit = () => {
    setIsActionSheetOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsActionSheetOpen(false);
    onDelete?.();
  };

  return (
    <section className="px-4 pt-6 pb-4 bg-white relative">
      {/* 모집 상태 뱃지와 메뉴 아이콘 */}
      <div className="mb-2 flex items-center justify-between">
        <PeriodChip status={status} dDay={dDay} size="large" />
        {isAdmin && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsActionSheetOpen(!isActionSheetOpen)}
              className="p-1"
              aria-label="메뉴"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            
            {/* 액션시트 */}
            {isActionSheetOpen && (
              <div className="absolute right-0 top-8 w-[120px] bg-white rounded-[8px] shadow-lg border border-gray-100 z-50 overflow-hidden">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-3 text-left text-[14px] font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  수정하기
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-3 text-left text-[14px] font-medium text-red-600 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 모집공고 제목 */}
      <h1 className="text-[18px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
        {title}
      </h1>

      {/* 게시일 */}
      <p className="mt-1 text-sm font-medium text-gray-400 leading-[135%] tracking-[-0.03em]">
        게시일 {formatDate(createdAt)}
      </p>
    </section>
  );
};

export default RecruitmentMetaSection;