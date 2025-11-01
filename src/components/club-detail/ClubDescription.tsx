import React from 'react';
import type { Club } from '../../types/club'; 

interface ClubDescriptionProps {
  club: Club;
  activityImages?: string[]; // (수정)
}

// (새로 추가) 섹션 타이틀 (Figma[image_dd97e4.png] 스타일)
const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[14px] font-semibold text-gray-800 leading-[1.35] tracking-[-0.03em] mb-3">
    {title}
  </h3>
);

// (새로 추가) 섹션 내용 (Figma[image_dd9808.png] 스타일)
const SectionContent = ({ content }: { content: string | null | undefined }) => {
  if (!content) {
    return (
      <p className="text-[16px] font-medium text-gray-300 leading-[1.65] tracking-[-0.03em]">
        등록된 내용이 없습니다.
      </p>
    );
  }
  return (
    <p className="text-[16px] font-medium text-gray-700 leading-[1.65] tracking-[-0.03em] whitespace-pre-wrap">
      {content}
    </p>
  );
};

// (수정)
const ClubDescription = ({ club, activityImages = [] }: ClubDescriptionProps) => {

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
        {/* (수정) activityImages 프롭스 사용 */}
        {activityImages && activityImages.length > 0 ? (
          <div className="space-y-4">
            {activityImages.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`활동 사진 ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
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