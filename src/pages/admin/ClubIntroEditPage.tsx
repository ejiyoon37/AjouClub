import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 컴포넌트
import Header from '../../components/common/Header';
import { useClubDetail } from '../../Hooks/useClubDetails';
import CameraIcon from '../../assets/icon/icon_camera.svg?react';

const ClubIntroEditPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const numericClubId = clubId ? Number(clubId) : null;
  const { data: club, isLoading } = useClubDetail(numericClubId || 0);
  
  // 동아리 이름
  const clubName = club?.clubName || '';

  const [description, setDescription] = useState('');
  const [mainActivities, setMainActivities] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const maxImages = 8;

  // 동아리 데이터 로드 시 초기값 설정
  useEffect(() => {
    if (club) {
      if (club.description) setDescription(club.description);
      if (club.mainActivities) setMainActivities(club.mainActivities);
      // TODO: 이미지도 로드 필요 시 여기에 추가
    }
  }, [club]);

  // 에러 상태
  const [errors, setErrors] = useState({
    description: false,
    mainActivities: false,
  });

  // --- 핸들러 ---
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
    alert('저장되었습니다.');
    navigate(-1);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const remainingSlots = maxImages - uploadedImages.length;

    Array.from(files).slice(0, remainingSlots).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === Math.min(files.length, remainingSlots)) {
          setUploadedImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const triggerImageInput = () => {
    imageInputRef.current?.click();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-500">동아리를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-10">
      <Header 
        variant="fix" 
        title="동아리 소개" 
        onSave={handleSave} 
      />

      <main className="flex-grow px-4 pt-6 space-y-8">
        {/* 상단 타이틀 섹션 */}
        <div className="space-y-2">
          {/* 동아리 이름 */}
          <p 
            className="text-[12px] font-normal leading-[140%] tracking-[-0.02em] text-[#808A96]"
            style={{ fontFamily: 'Wanted Sans', height: '17px' }}
          >
            {clubName}
          </p>
          
          {/* 동아리 소개 제목 */}
          <h1 
            className="text-[24px] font-semibold leading-[120%] tracking-[-0.03em] text-[#262931]"
            style={{ fontFamily: 'Wanted Sans', height: '29px' }}
          >
            동아리 소개
          </h1>
        </div>

        {/* 폼 섹션 */}
        <div className="space-y-6">
          {/* 동아리 설명 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              동아리 설명
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="동아리 소개, 동아리에 대한 간단한 설명을 적어주세요"
              rows={6}
              className={`w-full px-4 py-3 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none ${
                errors.description ? 'border border-[#FE5454]' : ''
              }`}
            />
          </div>

          {/* 주요 활동 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              주요 활동
            </label>
            <textarea
              value={mainActivities}
              onChange={handleMainActivitiesChange}
              placeholder="동아리의 주요 활동을 적어주세요"
              rows={6}
              className={`w-full px-4 py-3 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none ${
                errors.mainActivities ? 'border border-[#FE5454]' : ''
              }`}
            />
          </div>

          {/* 사진 업로드 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              사진
            </label>
            <div className="flex gap-3 flex-wrap">
              {/* 사진 추가 버튼 */}
              {uploadedImages.length < maxImages && (
                <div
                  onClick={triggerImageInput}
                  className="w-[120px] h-[120px] rounded-[11.9px] bg-[#F6F7F8] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#EDEEF0] transition-colors"
                >
                  <CameraIcon className="w-[47px] h-[40px]" />
                  <p 
                    className="text-[14px] font-medium text-gray-400 leading-[135%] tracking-[-0.03em] text-center"
                    style={{ fontFamily: 'Wanted Sans' }}
                  >
                    {uploadedImages.length}/{maxImages}
                  </p>
                </div>
              )}
              
              {/* 업로드된 이미지들 */}
              {uploadedImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative w-[120px] h-[120px] rounded-[11.9px] overflow-hidden"
                >
                  <img 
                    src={img} 
                    alt={`업로드된 이미지 ${idx + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                  <button
                    onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {/* 숨겨진 파일 인풋 */}
            <input 
              type="file" 
              ref={imageInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              multiple
              className="hidden" 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubIntroEditPage;