import React from 'react';


interface TextBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
}

const TextBtn = ({
  children,
  isActive = false,
  className,
  ...props
}: TextBtnProps) => {
  const baseStyle = `
    font-semibold text-base leading-[1.35] tracking-[-0.03em]
    transition-colors
  `;
  const activeStyle = isActive
    ? 'text-gray-900' // 'activated' 상태
    : 'text-gray-300'; // 'default' 상태

  return (
    <button

      className={`${baseStyle} ${activeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default TextBtn
