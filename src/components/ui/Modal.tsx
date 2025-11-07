// src/ui/Modal.tsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 모달 열리면 스크롤 방지
    } else {
      document.body.style.overflow = 'unset'; // 모달 닫히면 스크롤 허용
    }
    return () => {
      document.body.style.overflow = 'unset'; // 컴포넌트 언마운트 시 정리
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-90 p-4"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {children}
      </div>
    </div>,
    document.body // body에 직접 렌더링
  );
};

export default Modal;