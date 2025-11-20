import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 컴포넌트
import Header from '../../components/common/Header';
import CTABtn from '../../components/ui/Button/CTABtn';
import { useClubDetail } from '../../Hooks/useClubDetails';
import CameraIcon from '../../assets/icon/icon_camera.svg?react';
import { createRecruitment, uploadRecruitmentImage } from '../../api/recruitment';
import { useAuthStore } from '../../stores/useAuthStore';

const RecruitmentWritePage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const numericClubId = clubId ? Number(clubId) : null;
  const { data: club, isLoading } = useClubDetail(numericClubId || 0);
  const user = useAuthStore((state) => state.user);

  // 동아리 이름
  const clubName = club?.clubName || '';

  const [deadline, setDeadline] = useState('');
  const [isAlwaysRecruiting, setIsAlwaysRecruiting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [applicationLink, setApplicationLink] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null); // 실제 파일 저장
  const maxImages = 1; // 모집공고는 이미지 1개만

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
    setUploadedImageFile(file); // 실제 파일 저장
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages([reader.result as string]); // 미리보기용
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

  // 날짜 형식 변환 (YYYY-MM-DD)
  const formatDateForAPI = (dateString: string): string => {
    // 입력 형식: "2025. 11. 12. (수)" -> "2025-11-12"
    if (!dateString) return '';
    
    // 숫자와 점만 추출
    const numbers = dateString.match(/\d+/g);
    if (numbers && numbers.length >= 3) {
      const year = numbers[0];
      const month = numbers[1].padStart(2, '0');
      const day = numbers[2].padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const handleSubmit = async () => {
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

    if (!numericClubId) {
      alert('동아리 ID가 없습니다.');
      return;
    }

    try {
      // API 요청 데이터 준비
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
      const endDate = isAlwaysRecruiting ? null : formatDateForAPI(deadline);
      
      // type: 상시모집이면 "상시모집", 아니면 "수시모집"
      const recruitmentType: '상시모집' | '수시모집' = isAlwaysRecruiting ? '상시모집' : '수시모집';
      
      // phoneNumber와 email은 동아리 정보나 사용자 정보에서 가져오거나 null
      // 선택 필드는 null 또는 생략 가능
      const phoneNumber = club?.contactPhoneNumber || null;
      const email = club?.contactEmail || user?.email || null;

      // 모집공고 생성
      const recruitmentId = await createRecruitment(numericClubId, {
        title: title.trim(),
        description: description.trim(),
        type: recruitmentType,
        phoneNumber,
        email,
        startDate: today, // 시작일은 오늘로 설정
        endDate: endDate || null, // 상시모집이면 null, 아니면 마감일
        url: applicationLink.trim(),
      });

      // 이미지가 있으면 업로드
      if (uploadedImageFile) {
        try {
          await uploadRecruitmentImage(recruitmentId, uploadedImageFile);
        } catch (imageError: any) {
          console.error('이미지 업로드 실패:', imageError);
          // 이미지 업로드 실패해도 모집공고는 생성되었으므로 경고만 표시
          alert('모집 공고는 등록되었지만 이미지 업로드에 실패했습니다.');
        }
      }

      alert('모집 공고가 등록되었습니다.');
      navigate(`/clubs/${clubId}`);
    } catch (error: any) {
      console.error('모집공고 생성 실패:', error);
      const errorMessage = error?.response?.data?.message || error.message || '모집공고 등록 중 오류가 발생했습니다.';
      alert(errorMessage);
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

          {/* 모집공고 작성하기 제목 */}
          <h1 className="text-[24px] font-semibold text-gray-900 leading-[135%] tracking-[-0.03em]">
            모집공고 작성하기
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
              placeholder="이번 학기 동아리 부원을 모집해요!"
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
                    onClick={() => {
                      setUploadedImages(prev => prev.filter((_, i) => i !== idx));
                      setUploadedImageFile(null);
                    }}
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
          공고 게시하기
        </CTABtn>
      </div>
    </div>
  );
};

export default RecruitmentWritePage;