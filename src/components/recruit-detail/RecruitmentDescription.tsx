// src/components/recruitment-detail/RecruitmentDescriptionSection.tsx

import React from 'react';

interface RecruitmentDescriptionSectionProps {
  description: string;
}

const RecruitmentDescriptionSection = ({ description }: RecruitmentDescriptionSectionProps) => {
  // (새로 추가) API가 '\\n' 문자열을 보낼 경우를 대비해 실제 줄바꿈(\n)으로 치환합니다.
  const processedDescription = description.replace(/\\n/g, '\n');

  return (
    <section
      className="bg-gray-50 rounded-[12px] px-4 py-5 mt-6"
    >
      <p className="text-[16px] font-medium leading-[165%] tracking-[-0.03em] text-gray-800 whitespace-pre-wrap">
        {/* (수정) 치환된 텍스트를 렌더링합니다. */}
        {processedDescription}
      </p>
    </section>
  );
};

export default RecruitmentDescriptionSection;