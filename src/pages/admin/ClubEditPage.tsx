import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 컴포넌트
import Header from '../../components/common/Header';
import { useClubDetail } from '../../Hooks/useClubDetails';
// 아이콘 및 이미지
import DefaultImage from '../../assets/img/Default_images.png';
import InstaIcon from '../../assets/icon/icn_sns_insta.svg?react';
import WebIcon from '../../assets/icon/icn_sns_web.svg?react';    


const ClubEditPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const numericClubId = clubId ? Number(clubId) : null;
  const { data: club, isLoading } = useClubDetail(numericClubId || 0);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [clubType, setClubType] = useState<'중앙동아리' | '소학회' | null>(null); 
  const [room, setRoom] = useState('');
  const [target, setTarget] = useState('');
  const [snsInsta, setSnsInsta] = useState('');
  const [snsWeb, setSnsWeb] = useState('');

  // 동아리 데이터 로드 시 초기값 설정
  useEffect(() => {
    if (club) {
      if (club.clubName) setName(club.clubName);
      if (club.clubType === '중앙동아리' || club.clubType === '소학회') {
        setClubType(club.clubType);
      } else {
        // '기타'인 경우 기본값 설정
        setClubType('중앙동아리');
      }
      if (club.location) setRoom(club.location);
      // recruitmentTarget은 API에서 직접 가져와야 할 수도 있음 (현재 Club 타입에 없음)
      // 일단 null로 처리
      if (club.instagramUrl) setSnsInsta(club.instagramUrl);
      if (club.clubUrl) setSnsWeb(club.clubUrl);
      if (club.profileImageUrl) setPreviewImage(club.profileImageUrl);
    }
  }, [club]);

  // 에러 상태
  const [errors, setErrors] = useState({
    name: false,
    clubType: false,
    target: false,
  });

  // --- 핸들러 ---
  const handleSave = () => {
    // 필수 입력 검증
    const newErrors = {
      name: !name.trim(),
      clubType: !clubType,
      target: !target.trim(),
    };

    setErrors(newErrors);

    // 하나라도 에러가 있으면 저장하지 않음
    if (newErrors.name || newErrors.clubType || newErrors.target) {
      return;
    }

    // TODO: API 전송 로직
    alert('저장되었습니다.');
    navigate(-1);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleTypeChange = (type: '중앙동아리' | '소학회') => {
    if (clubType === type) return; 
    setClubType(type);
    // 유형 선택 시 에러 상태 해제
    if (errors.clubType) {
      setErrors(prev => ({ ...prev, clubType: false }));
    }
  };

  // 입력 시 에러 상태 해제
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: false }));
    }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
    if (errors.target) {
      setErrors(prev => ({ ...prev, target: false }));
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
        title="동아리 정보 수정" 
        onSave={handleSave} 
      />

      <main className="flex-grow px-4 pt-6 space-y-8">
        
        {/*. 동아리 프로필 이미지  */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div 
            onClick={triggerFileInput}
            className="relative w-[80px] h-[80px] rounded-full overflow-hidden border border-gray-100 cursor-pointer"
          >
            <img 
              src={previewImage || DefaultImage} 
              alt="Club Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/*  사진 업로드 / 사진 수정 */}
          <button 
            onClick={triggerFileInput}
            className="text-[14px] font-medium text-[#808A96] leading-[135%] tracking-[-0.03em] underline underline-offset-2 text-center"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            {previewImage ? '사진 수정' : '사진 업로드'}
          </button>
          
          {/* 숨겨진 파일 인풋 */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>


        {/* 폼 섹션 */}
        <div className="space-y-6">
          
          {/* 동아리 이름 */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              동아리 이름
            </label>
            <input 
              type="text" 
              value={name}
              onChange={handleNameChange}
              placeholder="동아리 이름을 입력해주세요"
              className={`w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 ${
                errors.name ? 'border border-[#FE5454]' : ''
              }`}
            />
          </div>

          {/* 동아리 유형 (필수, 취소 불가) */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              동아리 유형
            </label>
            <div className="flex gap-2">
              {/* 소학회 버튼 */}
              <button
                onClick={() => handleTypeChange('소학회')}
                className={`
                  flex-1 h-[48px] rounded-[10px] text-[16px] font-medium transition-colors
                  ${clubType === '소학회' 
                    ? 'bg-[#3F454A] text-white' // 선택됨
                    : 'bg-gray-50 text-gray-400'  // 선택안됨
                  }
                `}
              >
                소학회
              </button>
              {/* 중앙동아리 버튼 */}
              <button
                onClick={() => handleTypeChange('중앙동아리')}
                className={`
                  flex-1 h-[48px] rounded-[10px] text-[16px] font-medium transition-colors
                  ${clubType === '중앙동아리' 
                    ? 'bg-[#3F454A] text-white' 
                    : 'bg-gray-50 text-gray-400'
                  }
                `}
              >
                중앙동아리
              </button>
            </div>
            {errors.clubType && (
              <p 
                className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#FE5454] text-left"
                style={{ fontFamily: 'Wanted Sans' }}
              >
                유형을 선택해주세요!
              </p>
            )}
          </div>

          {/* 동아리방  */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              동아리방
            </label>
            <input 
              type="text" 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="동아리방 위치를 입력해주세요"
              className="w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
          </div>

          {/*  모집대상  */}
          <div className="space-y-2">
            <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              동아리 모집대상
            </label>
            <input 
              type="text" 
              value={target}
              onChange={handleTargetChange}
              placeholder="모집 대상을 입력해주세요"
              className={`w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200 ${
                errors.target ? 'border border-[#FE5454]' : ''
              }`}
            />
          </div>

          {/* SNS (아이콘 + 입력창) */}
          <div className="space-y-3">
             <label className="text-[14px] font-medium leading-[135%] tracking-[-0.03em] text-[#808A96]" style={{ fontFamily: 'Wanted Sans' }}>
              SNS
            </label>
            
            {/* 인스타그램 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <InstaIcon />
              </div>
              <input 
                type="text"
                value={snsInsta}
                onChange={(e) => setSnsInsta(e.target.value)}
                placeholder="인스타그램 링크"
                className="w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>

            {/* 웹사이트 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                <WebIcon />
              </div>
              <input 
                type="text"
                value={snsWeb}
                onChange={(e) => setSnsWeb(e.target.value)}
                placeholder="기타 웹 링크"
                className="w-full h-[48px] px-4 bg-gray-50 rounded-[10px] text-[16px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ClubEditPage;