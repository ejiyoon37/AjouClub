import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 컴포넌트
import Header from '../../components/common/Header';
import CTABtn from '../../components/ui/Button/CTABtn';
import { useRecruitmentPost } from '../../Hooks/useRecruitmentPost';
import CameraIcon from '../../assets/icon/icon_camera.svg?react';

const RecruitmentEditPage = () => {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const numericRecruitmentId = recruitmentId ? Number(recruitmentId) : null;
  const { data: recruitment, isLoading } = useRecruitmentPost(numericRecruitmentId || 0);

  // 동아리 이름
  const clubName = recruitment?.clubName || '';

  const [deadline, setDeadline] = useState('');
  const [isAlwaysRecruiting, setIsAlwaysRecruiting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [applicationLink, setApplicationLink] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const maxImages = 1; // 모집공고는 이미지 1개만

  // 기존 데이터 로드
  useEffect(() => {
    if (recruitment) {
      setTitle(recruitment.title || '');
      setDescription(recruitment.description || '');
      setApplicationLink(recruitment.url || '');
      if (recruitment.images && recruitment.images.length > 0) {
        setUploadedImages([recruitment.images[0]]); // 첫 번째 이미지만
      }
      if (recruitment.endDate) {
        // 날짜 포맷 변환 (YYYY-MM-DD -> YYYY. MM. DD. (요일))
        const date = new Date(recruitment.endDate);
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}. (${days[date.getDay()]})`;
        setDeadline(formattedDate);
        setIsAlwaysRecruiting(false);
      } else {
        setIsAlwaysRecruiting(true);
        setDeadline('');
      }
    }
  }, [recruitment]);

  // 에러 상태
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    applicationLink: false,
    deadline: false,
  });

  // 이미지 업로드 핸들러 (1개만)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // 첫 번째 파일만 사용
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages([reader.result as string]); // 1개만 저장
    };
    reader.readAsDataURL(file);
  };

  const triggerImageInput = () => {
    imageInputRef.current?.click();
  };

  // 입력 시 에러 상태 해제
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors(prev => ({ ...prev, description: false }));
    }
  };

  const handleApplicationLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationLink(e.target.value);
    if (errors.applicationLink) {
      setErrors(prev => ({ ...prev, applicationLink: false }));
    }
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value);
    if (errors.deadline) {
      setErrors(prev => ({ ...prev, deadline: false }));
    }
  };

  const handleSubmit = () => {
    // 필수 입력 검증 (상시모집이 체크되지 않았을 때만 마감일 필수)
    const newErrors = {
      title: !title.trim(),
      description: !description.trim(),
      applicationLink: !applicationLink.trim(),
      deadline: !isAlwaysRecruiting && !deadline.trim(), // 상시모집이 아니면 필수
    };

    setErrors(newErrors);

    // 하나라도 에러가 있으면 저장하지 않음
    if (newErrors.title || newErrors.description || newErrors.applicationLink || newErrors.deadline) {
      return;
    }

    // TODO: API 연동 (공고 수정 요청)
    alert('모집 공고가 수정되었습니다.');
    navigate(`/recruitments/${recruitmentId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!recruitment) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-500">공고를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-10">
      <Header variant="page" />

      <main className="flex-grow px-4 pt-6 space-y-8">
        {/* 상단 타이틀 섹션 */}
        <div className="space-y-2">
          {/* 동아리명 */}
          <div className="space-y-2">
            <p 
              className="text-[12px] font-normal leading-[140%] tracking-[-0.02em] text-[#808A96]"
              style={{ fontFamily: 'Wanted Sans' }}
            >
              {clubName}
            </p>
          </div>

          {/* 모집공고 수정하기 제목 */}
          <h1 className="text-[24px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
            모집공고 수정하기
          </h1>
        </div>

        {/* 폼 섹션 */}
        <div className="space-y-6">
          {/* 모집 마감일 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600" style={{ fontFamily: 'Wanted Sans' }}>
              모집 마감일
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={deadline}
                onChange={handleDeadlineChange}
                placeholder="2025. 11. 12. (수)"
                disabled={isAlwaysRecruiting}
                className={`w-[130px] h-[36px] py-3 px-[10px] bg-gray-50 rounded-[8px] text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 ${
                  isAlwaysRecruiting ? 'opacity-50' : ''
                } ${
                  errors.deadline ? 'border border-[#FE5454]' : ''
                }`}
                style={{ fontFamily: 'Wanted Sans' }}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAlwaysRecruiting}
                  onChange={(e) => {
                    setIsAlwaysRecruiting(e.target.checked);
                    if (e.target.checked) {
                      setDeadline('');
                      // 상시모집 체크 시 마감일 에러 해제
                      if (errors.deadline) {
                        setErrors(prev => ({ ...prev, deadline: false }));
                      }
                    }
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-[#3168FF] focus:ring-[#3168FF]"
                />
                <span 
                  className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#6E757D]"
                  style={{ fontFamily: 'Wanted Sans' }}
                >
                  상시모집
                </span>
              </label>
            </div>
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600" style={{ fontFamily: 'Wanted Sans' }}>
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="25년도 2학기 동아리 부원을 모집해요!"
              className={`w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 ${
                errors.title ? 'border border-[#FE5454]' : ''
              }`}
              style={{ fontFamily: 'Wanted Sans' }}
            />
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600" style={{ fontFamily: 'Wanted Sans' }}>
              내용
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="- 동아리 소개&#10;- 활동 계획&#10;- 추천 대상"
              rows={8}
              className={`w-full px-4 py-3 bg-gray-50 rounded-[10px] text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none whitespace-pre-line ${
                errors.description ? 'border border-[#FE5454]' : ''
              }`}
              style={{ fontFamily: 'Wanted Sans' }}
            />
          </div>

          {/* 신청 링크 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-gray-600" style={{ fontFamily: 'Wanted Sans' }}>
              신청 링크
            </label>
            <input
              type="text"
              value={applicationLink}
              onChange={handleApplicationLinkChange}
              placeholder="동아리 신청 링크를 입력해 주세요 ex. 구글폼, 인스타그램 등"
              className={`w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 ${
                errors.applicationLink ? 'border border-[#FE5454]' : ''
              }`}
              style={{ fontFamily: 'Wanted Sans' }}
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
              className="hidden"
            />
          </div>
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4 py-3 bg-white border-t border-gray-100 flex justify-center">
        <CTABtn isActive={true} onClick={handleSubmit}>
          공고 수정하기
        </CTABtn>
      </div>
    </div>
  );
};

export default RecruitmentEditPage;
