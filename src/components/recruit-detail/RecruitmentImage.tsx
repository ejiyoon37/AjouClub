// src/components/recruitment-detail/RecruitmentImageSection.tsx

import React from 'react';

interface RecruitmentImageSectionProps {
  imageUrl?: string;
}

const RecruitmentImageSection = ({ imageUrl }: RecruitmentImageSectionProps) => {
  if (!imageUrl) return null;

  return (
    <section className="bg-white px-4">
      <img
        src={imageUrl}
        alt="모집 공고 이미지"
        className="w-full rounded-lg object-cover"
      />
    </section>
  );
};

export default RecruitmentImageSection;