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

  const baseStyle = 'px-4 py-2 rounded-md font-bold transition-colors';


  const activeStyle = isActive
    ? 'bg-gray-700 text-white border-transparent' // 활성화
    : 'bg-white border border-gray-100 text-gray-700'; // 기본 상태

  return (
    <button
      className={`${baseStyle} ${activeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn