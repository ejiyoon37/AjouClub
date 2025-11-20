// src/components/club-detail/ClubDescription.tsx

import type { Club } from '../../types/club'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline'; 

interface ClubDescriptionProps {
  club: Club;
  activityImages?: string[]; 
  isAdmin?: boolean; 
}

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[14px] font-semibold text-gray-800 leading-[1.35] tracking-[-0.03em] mb-3">
    {title}
  </h3>
);

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

const ClubDescription = ({ club, activityImages, isAdmin = false }: ClubDescriptionProps) => {
  const navigate = useNavigate();
  const validImages = activityImages ? activityImages.filter(imgUrl => !!imgUrl) : [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-50 p-4 space-y-6 pb-24"> 
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
                className="w-full h-auto rounded-lg object-cover border border-gray-100 cursor-pointer" 
                onClick={() => handleImageClick(imgUrl)}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ) : (
          <p className="text-[16px] font-medium text-gray-300 leading-[1.65] tracking-[-0.03em]">
            등록된 사진이 없습니다.
          </p>
        )}
      </section>

      {/* 관리자 전용 소개 수정 버튼 */}
      {isAdmin && (
        <div className="mt-8 px-4 flex justify-center">
          <button 
             onClick={() => navigate(`/admin/clubs/${club.clubId}/intro/edit`)}
             className="w-[343px] h-[40px] rounded-[6px] py-2 px-4 border border-[#E9EDF0] bg-white text-[#6E757D] text-[14px] font-medium leading-[135%] tracking-[-0.03em] transition-colors hover:opacity-80"
             style={{ fontFamily: 'Wanted Sans' }}
          >
            소개 수정하기
          </button>
        </div>
      )}

      {/* 이미지 뷰어 모달  */}
      {isModalOpen && selectedImage && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={handleCloseModal} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="확대된 활동 사진" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ClubDescription;