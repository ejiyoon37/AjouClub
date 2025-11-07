// src/components/recruitment-detail/RecruitmentDescriptionSection.tsx

//import React from 'react';

interface RecruitmentDescriptionSectionProps {
  description: string;
}

const RecruitmentDescriptionSection = ({ description }: RecruitmentDescriptionSectionProps) => {

  const processedDescription = description.replace(/\\n/g, '\n');

  return (
    <section
      className="bg-gray-50 rounded-[12px] px-4 py-5 mt-6"
    >

      <p className="text-[16px] font-medium leading-[165%] tracking-[-0.03em] text-gray-800 whitespace-pre-wrap break-words">
        
        {processedDescription}
      </p>
    </section>
  );
};

export default RecruitmentDescriptionSection;