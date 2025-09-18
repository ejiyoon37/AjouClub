import React from 'react';

interface ClubDescriptionProps {
  description?: string;
}

const ClubDescription = ({ description }: ClubDescriptionProps) => {
  return (
    <div className="bg-gray-50 p-4">
      {description ? (
        <p className="text-[14px] text-gray-700 leading-[135%] tracking-[-0.03em] whitespace-pre-line">
          {description}
        </p>
      ) : (
        <p className="text-[14px] text-gray-300 leading-[135%] tracking-[-0.03em] text-center py-10">
          등록된 동아리 소개가 없습니다.
        </p>
      )}
    </div>
  );
};

export default ClubDescription;