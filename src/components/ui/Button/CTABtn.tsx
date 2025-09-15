import React from 'react';

interface CTABtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children?: React.ReactNode; 
}

export const CTABtn = ({ 
  isActive, 
  children, 
  className, 
  ...props 
}: CTABtnProps) => {
  const baseStyle = `
    w-full h-12 px-3 py-2.5 rounded-lg
    font-semibold text-base leading-[1.35] tracking-[-0.03em]
    transition-colors
  `;

  const activeStyle = isActive
    ? 'bg-blue-400 text-white'  // Activated
    : 'bg-gray-400 text-white'; // Default

 
  const buttonText = children 
    ? children 
    : isActive ? '신청하기' : '신청마감';

  return (
    <button
      className={`${baseStyle} ${activeStyle} ${className}`}
      disabled={!isActive}
      {...props}
    >
      {buttonText}
    </button>
  );
};

export default CTABtn;

