import React from 'react';
//사이즈
type TypeChipSize = 'regular' | 'medium';


interface TypeChipProps {
  children: React.ReactNode; 
  size?: TypeChipSize;
}
const TypeChip = ({ children, size = 'regular' }: TypeChipProps) => {

  const baseDivStyle = "inline-flex items-center justify-center rounded-full";
  const baseSpanStyle = "font-medium leading-[1.4] tracking-[-0.03em]";


  const getSizeStyles = () => {
    switch (size) {
      case 'medium':
        return {
          div: 'bg-gray-50 h-[21px] px-1.5 py-0.5',
          span: 'text-xs text-gray-500', 
        };
      case 'regular':
      default:
        return {
          div: 'bg-gray-100 h-[18px] px-2 py-0.5',
          span: 'text-[10px] text-gray-500',
        };
    }
  };

  const { div: sizeDivStyle, span: sizeSpanStyle } = getSizeStyles();

  return (

    <div className={`${baseDivStyle} ${sizeDivStyle}`}>
      <span className={`${baseSpanStyle} ${sizeSpanStyle}`}>
        {children}
      </span>
    </div>
  );
};

export default TypeChip