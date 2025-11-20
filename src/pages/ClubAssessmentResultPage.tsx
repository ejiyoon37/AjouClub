// src/pages/ClubAssessmentResultPage.tsx

import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Header from '../components/common/Header';
import CTABtn from '../components/ui/Button/CTABtn';
import { useAuthStore } from '../stores/useAuthStore';

// 이미지 임포트
import sportImage from '../assets/img/sport.png';
import studyImage from '../assets/img/study.png';
import volunteerImage from '../assets/img/volunteer.png';
import religionImage from '../assets/img/religion.png';

// 특수문자가 있는 파일명은 import.meta.url을 사용하여 동적 로드
// Vite에서는 상대 경로로 접근 가능
const entrepreneurshipImageUrl = new URL('../assets/img/Entrepreneurship .png', import.meta.url).href;
const cultureArtsImageUrl = new URL('../assets/img/culture:arts.png', import.meta.url).href;

// 카테고리별 이미지 매핑
const CATEGORY_IMAGE_MAP: Record<Category, string> = {
  '스포츠': sportImage,
  '학술': studyImage,
  '봉사': volunteerImage,
  '창업': entrepreneurshipImageUrl,
  '문화/예술': cultureArtsImageUrl,
  '종교': religionImage,
  '사교': sportImage, // 사교는 이미지가 없으므로 기본 이미지 사용
};

type Category = '스포츠' | '학술' | '종교' | '문화/예술' | '사교' | '봉사' | '창업';

interface LocationState {
  category: Category;
}


// 카테고리별 한글 이름
const CATEGORY_NAME_MAP: Record<Category, string> = {
  '스포츠': '스포츠',
  '학술': '학술',
  '봉사': '봉사',
  '창업': '창업',
  '문화/예술': '문화/예술',
  '종교': '종교',
  '사교': '사교',
};

const ClubAssessmentResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  // location state에서 카테고리 가져오기
  const category = useMemo(() => {
    const state = location.state as LocationState | null;
    return state?.category || '스포츠'; // 기본값: 스포츠
  }, [location.state]);

  // 사용자 이름 가져오기
  const userName = user?.name || '';
  
  // 추천 텍스트 결정
  const recommendationText = useMemo(() => {
    if (isLoggedIn && userName) {
      return `${userName}님에게 추천하는 동아리`;
    }
    return '당신에게 추천하는 동아리';
  }, [isLoggedIn, userName]);

  // 카테고리별 이미지 가져오기
  const resultImage = CATEGORY_IMAGE_MAP[category] || sportImage;
  const categoryName = CATEGORY_NAME_MAP[category] || '스포츠';

  // 동아리 둘러보기 버튼 클릭 핸들러
  const handleBrowseClubs = () => {
    // 카테고리 필터를 state로 전달하여 동아리 둘러보기 페이지로 이동
    navigate('/clubs', {
      state: {
        filters: {
          category: category,
        },
      },
      replace: false,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <Header variant="logoOnly" />

      <main className="flex-grow flex flex-col items-center px-4 pt-32 pb-24">
        {/* 추천 텍스트 */}
        <div className="flex flex-col items-center mb-6">
          <p
            className="text-[18px] font-medium leading-[135%] tracking-[-0.03em] text-[#262931] mb-2 text-center"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            {recommendationText}
          </p>
          <p
            className="text-[24px] font-semibold leading-[120%] tracking-[-0.03em] text-[#3168FF] text-center"
            style={{ fontFamily: 'Wanted Sans' }}
          >
            {categoryName} 분야
          </p>
        </div>

        {/* 결과 이미지 */}
        <div className="w-full max-w-[343px] pt-8 mb-8">
          <img
            src={resultImage}
            alt={`${categoryName} 동아리 이미지`}
            className="w-full h-auto rounded-[12px] object-cover"
          />
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4 py-3 bg-white border-t border-gray-100">
        <CTABtn isActive={true} onClick={handleBrowseClubs}>
          {categoryName} 동아리 둘러보기
        </CTABtn>
      </div>
    </div>
  );
};

export default ClubAssessmentResultPage;
