import React from 'react';

interface PrimaryBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

const PrimaryBtn = ({
  children,
  isActive = false,
  className,
  ...props
}: PrimaryBtnProps) => {

  const baseStyle = 'w-[343px] h-[40px] rounded-[6px] px-4 py-2 text-[14px] font-medium leading-[135%] tracking-[-0.03em] transition-colors border';

  const activeStyle = isActive
    ? 'bg-white border-[#E9EDF0] text-gray-600' // 활성화
    : 'bg-white border-[#E9EDF0] text-gray-600'; // 기본 상태

  return (
    <button
      className={`${baseStyle} ${activeStyle} ${className}`}
      style={{ fontFamily: 'Wanted Sans' }}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn