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
    w-full h-12 px-3 py-2.5 rounded-lg
    font-semibold text-base leading-[1.35] tracking-[-0.03em]
    transition-colors
  `;

  const activeStyle = isActive
    ? 'bg-blue-400 text-white'  // 활성화
    : 'bg-gray-400 text-white'; // 비활성화

  return (
    <button
      className={`${baseStyle} ${activeStyle} ${className}`}
      disabled={!isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTABtn;