import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '../../../assets/icon/icn_search_24-2.svg?react';

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disableFocusNavigate?: boolean; 
}

const SearchField = ({
  className,
  value,
  disableFocusNavigate = false, 
  ...props
}: SearchFieldProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const navigate = useNavigate();
  const hasValue = value && String(value).length > 0;

  const getContainerStyle = () => {
    if (isActivated) {
      return 'bg-gray-50 border-2 border-blue-400';
    }
    return 'bg-gray-50 border-2 border-transparent';
  };

  const iconColorClass = isActivated ? 'text-blue-400' : 'text-gray-500';

  return (
    <div
      className={`
        flex items-center w-full h-12 px-2.5 py-2 gap-1 rounded-lg transition-colors
        ${getContainerStyle()} ${className}
      `}
    >
      <SearchIcon className={`w-6 h-6 ${iconColorClass}`} />
      <input
        value={value}
        onFocus={(e) => {
          setIsActivated(true);
          
          if (!disableFocusNavigate) {
            navigate('/search');
          }
        }}
        onBlur={() => setIsActivated(false)}
        placeholder="동아리를 검색해 보세요!"
        className={`
          w-full h-full bg-transparent text-base font-medium placeholder-gray-300
          focus:outline-none
          ${hasValue ? 'text-gray-800' : 'text-gray-300'}
        `}
        {...props}
      />
    </div>
  );
};
export default SearchField;