import React from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40 flex justify-center items-end transition-opacity duration-300"
      onClick={onClose}
    >
      {/* 실제 콘텐츠가 담길 시트 */}
      <div
        className="w-full bg-white rounded-t-[20px] p-4 z-50 animate-slide-up"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
