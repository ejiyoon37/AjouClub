//import React from 'react';

type ChipStatus = 'regular' | 'd-day' | 'end';
type ChipSize = 'small' | 'medium' | 'large';

interface PeriodChipProps {
  status: ChipStatus;
  dDay?: number; 
  size?: ChipSize; //  (small | medium | large)
}

const PeriodChip = ({ status, dDay, size = 'small' }: PeriodChipProps) => {
  const baseStyle = `
    inline-flex w-auto items-center justify-center
    h-[20px] rounded-[4px]
    font-bold leading-[1.4] tracking-[-0.03em]
  `;

  const getSizeStyle = () => {
    switch (size) {
      case 'large':
        return 'px-2 py-1 text-sm';
      case 'medium':
        return 'px-[5px] py-0.5 text-xs';
      case 'small':
      default:
        return 'px-[5px] py-[3px] text-[10px]';
    }
  };

  const getChipDetails = () => {
    switch (status) {
      case 'd-day':
        return {
          style: 'bg-red-50 text-red-300',
          text: dDay !== undefined ? `마감 D-${dDay}` : '마감 임박',
        };
      case 'end':
        return {
          style: 'bg-gray-100 text-gray-500',
          text: '마감',
        };
      case 'regular':
      default:
        return {
          style: 'bg-blue-50 text-blue-400',
          text: '상시모집',
        };
    }
  };

  const sizeStyle = getSizeStyle();
  const { style, text } = getChipDetails();

  return (
    <div className={`${baseStyle} ${sizeStyle} ${style}`}>
      <span>{text}</span>
    </div>
  );
};

export default PeriodChip