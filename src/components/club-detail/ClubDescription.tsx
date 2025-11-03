import React from 'react';
import type { Club } from '../../types/club'; 

interface ClubDescriptionProps {
  club: Club;
  activityImages?: string[]; 
}

// SectionTitle
const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[14px] font-semibold text-gray-800 leading-[1.35] tracking-[-0.03em] mb-3">
    {title}
  </h3>
);

//  SectionContent에 줄바꿈 처리 추가
const SectionContent = ({ content }: { content: string | null | undefined }) => {
  if (!content) {
    return (
      <p className="text-[16px] font-medium text-gray-300 leading-[1.65] tracking-[-0.03em]">
        등록된 내용이 없습니다.
      </p>
    );
  }
  

  const processedContent = content.replace(/\\n/g, '\n');

  return (
    <p className="text-[16px] font-medium text-gray-700 leading-[1.65] tracking-[-0.03em] whitespace-pre-wrap">
      {processedContent}
    </p>
  );
};


const ClubDescription = ({ club, activityImages }: ClubDescriptionProps) => {


  const validImages = activityImages ? activityImages.filter(imgUrl => !!imgUrl) : [];

  return (
    <div className="bg-gray-50 p-4 space-y-6">
      {/* 1. 동아리 설명 */}
      <section>
        <SectionTitle title="동아리 설명" />
        <SectionContent content={club.description} />
      </section>

      {/* 2. 주요 활동 */}
      <section>
        <SectionTitle title="주요 활동" />
        <SectionContent content={club.mainActivities} />
      </section>

      {/* 3. 활동 사진 */}
      <section>
        <SectionTitle title="활동 사진" />
        {validImages.length > 0 ? (
          <div className="space-y-4">
            {validImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl} 
                alt={`활동 사진 ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover border border-gray-100" 
              />
            ))}
          </div>
        ) : (
          <p className="text-[16px] font-medium text-gray-300 leading-[1.65] tracking-[-0.03em]">
            등록된 사진이 없습니다.
          </p>
        )}
      </section>
    </div>
  );
};

export default ClubDescription;