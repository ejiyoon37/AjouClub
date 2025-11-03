import React, { useState, useRef, useEffect } from 'react';


import ArrowDownIcon from '../../../assets/icon/ic_arrow_down_16.svg?react';


interface SelectFieldProps {
  options: string[]; 
  value: string | null; 
  onChange: (value: string) => void; 
  placeholder?: string; 
}

const SelectField = ({ 
  options, 
  value, 
  onChange, 
  placeholder = '전체' 
}: SelectFieldProps) => {
//드롭다운 열
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

//드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option: string) => {
    onChange(option); 
    setIsOpen(false); 
  };

  const selectedText = value || placeholder;

  return (
    <div className="relative w-full" ref={selectRef}>
   
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full h-12 px-4 py-3 bg-white border rounded-lg
          transition-colors
          ${isOpen ? 'border-blue-400' : 'border-gray-100'}
        `}
      >
        <span className="text-sm font-medium text-gray-700">{selectedText}</span>
        <ArrowDownIcon 
          className={`w-4 h-4 text-gray-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelectOption(option)}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SelectField
