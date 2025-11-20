import React from 'react';

interface CTABtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;  // 이제 children은 필수
}

export const CTABtn = ({ 
  isActive, 
  children, 
  className = '', 
  ...props 
}: CTABtnProps) => {
  const baseStyle = `
    w-full h-[48px] rounded-[8px] px-3 py-[10px]
    text-[16px] font-semibold leading-[135%] tracking-[-0.03em]
    transition-colors
  `;

  const activeStyle = isActive
    ? 'bg-[#3168FF] text-white'  // 활성화
    : 'bg-[#A0AAB0] text-white'; // 비활성화

  return (
    <button
      className={`${baseStyle} ${activeStyle} ${className}`}
      style={{ fontFamily: 'Wanted Sans' }}
      disabled={!isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTABtn;