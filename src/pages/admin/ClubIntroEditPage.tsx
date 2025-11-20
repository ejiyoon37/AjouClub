import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { useClubDetail } from '../../Hooks/useClubDetails';
import { useClubActivityImages } from '../../Hooks/useClubActivityImages';

const ClubIntroEditPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const numericClubId = clubId ? Number(clubId) : null;
  
  const { data: club, isLoading } = useClubDetail(numericClubId || 0);
  const { data: activityImages } = useClubActivityImages(numericClubId || 0);
  
  const [description, setDescription] = useState('');
  const [mainActivities, setMainActivities] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 에러 상태
  const [errors, setErrors] = useState({
    description: false,
    mainActivities: false,
  });

  // 기존 데이터 로드
  useEffect(() => {
    if (club) {
      setDescription(club.description || '');
      setMainActivities(club.mainActivities || '');
    }
    if (activityImages) {
      setUploadedImages([...activityImages]);
    }
  }, [club, activityImages]);

  const handleSave = () => {
    // 필수 입력 검증
    const newErrors = {
      description: !description.trim(),
      mainActivities: !mainActivities.trim(),
    };

    setErrors(newErrors);

    // 하나라도 에러가 있으면 저장하지 않음
    if (newErrors.description || newErrors.mainActivities) {
      return;
    }

    // TODO: API 전송 로직
    // PUT /api/clubs/{clubId}/intro
    // body: { description, mainActivities, activityImages: uploadedImages }
    alert('저장되었습니다.');
    navigate(-1);
  };

  // 입력 시 에러 상태 해제
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: false }));
    }
  };

  const handleMainActivitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMainActivities(e.target.value);
    if (errors.mainActivities) {
      setErrors(prev => ({ ...prev, mainActivities: false }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const MAX_IMAGES = 8;
      const remainingSlots = MAX_IMAGES - uploadedImages.length;
      const filesToAdd = Array.from(files).slice(0, remainingSlots);
      
      if (filesToAdd.length === 0) {
        alert('최대 8장까지 업로드할 수 있습니다.');
        return;
      }

      const newImages: string[] = [];
      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === filesToAdd.length) {
            setUploadedImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // input 초기화하여 같은 파일도 다시 선택 가능하도록
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerImageInput = () => {
    imageInputRef.current?.click();
  };

  if (isLoading) {
    return <div className="p-4 text-center">로딩 중...</div>;
  }

  if (!club) {
    return <div className="p-4 text-center text-red-500">동아리 정보를 불러올 수 없습니다.</div>;
  }

  const textareaClassName = "w-full min-h-[120px] px-4 py-3 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-10">
      <Header 
        variant="fix" 
        title="동아리 소개" 
        onSave={handleSave} 
      />

      <main className="flex-grow px-4 pt-6 space-y-6">
        {/* 동아리 설명 */}
        <div className="space-y-2">
          <label 
            className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" 
            style={{ fontFamily: 'Wanted Sans' }}
          >
            동아리 설명
          </label>
          <textarea 
            value={description}
            onChange={handleDescriptionChange}
            placeholder="동아리 소개, 동아리에 대한 간단한 설명을 적어주세요"
            className={`${textareaClassName} ${errors.description ? 'border border-[#FE5454]' : ''}`}
            rows={6}
          />
        </div>

        {/* 주요 활동 */}
        <div className="space-y-2">
          <label 
            className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" 
            style={{ fontFamily: 'Wanted Sans' }}
          >
            주요 활동
          </label>
          <textarea 
            value={mainActivities}
            onChange={handleMainActivitiesChange}
            placeholder="동아리의 주요 활동을 적어주세요"
            className={`${textareaClassName} ${errors.mainActivities ? 'border border-[#FE5454]' : ''}`}
            rows={6}
          />
        </div>

        {/* 사진 */}
        <div className="space-y-2">
          <label 
            className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" 
            style={{ fontFamily: 'Wanted Sans' }}
          >
            사진
          </label>
          
          {/* 사진 목록 */}
          {uploadedImages.length > 0 && (
            <div className="space-y-4">
              {uploadedImages.map((imgUrl, index) => (
                <div key={index} className="relative">
                  <img 
                    src={imgUrl} 
                    alt={`활동 사진 ${index + 1}`}
                    className="w-full h-auto rounded-lg object-cover border border-gray-100" 
                    loading="lazy"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 w-6 h-6 flex items-center justify-center text-sm"
                    aria-label="사진 삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 사진 추가 영역 (최대 8장) */}
          {uploadedImages.length < 8 && (
            <div 
              onClick={triggerImageInput}
              className="w-full aspect-square max-w-[343px] bg-gray-50 rounded-[10px] border border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path 
                  d="M12 5V19M5 12H19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[14px] font-medium text-gray-400 leading-[135%] tracking-[-0.03em]">
                {uploadedImages.length}/8
              </span>
            </div>
          )}
          
          {/* 사진 개수 표시 (8장 모두 업로드된 경우) */}
          {uploadedImages.length >= 8 && (
            <div className="text-[14px] font-medium text-gray-400 leading-[135%] tracking-[-0.03em] text-center py-2">
              {uploadedImages.length}/8
            </div>
          )}
          
          <input 
            type="file" 
            ref={imageInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            multiple
            className="hidden" 
          />
        </div>
      </main>
    </div>
  );
};

export default ClubIntroEditPage;