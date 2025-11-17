// src/pages/ClubAssessmentPage.tsx
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import TopNav from '../components/common/TopNav';
import CTABtn from '../components/ui/Button/CTABtn';
import Header from '../components/common/Header';

// 임시 질문 데이터 
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: '동아리 활동에서 가장 큰 행복감을 얻는 것은 무엇인가요?',
    options: [
      '맛있는 음식과 함께 여럿이 웃고 떠들며 자연스럽게 친해지는 과정',
      '무언가를 배우고 익혀서 내 실력이 성장하고 있다는 느낌',
      '나의 생각과 감성을 담아 멋진 결과물을 완성했을 때의 뿌듯함',
      '내가 가진 재능이나 시간으로 누군가를 실제로 도왔을 때의 벅찬 보람',
    ],
  },
  {
    id: 2,
    question: '두 번째 질문입니다.',
    options: ['선택 1', '선택 2', '선택 3'],
  },
];

const ClubAssessmentPage = () => {
  //const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
  const isLastStep = currentStep === ASSESSMENT_QUESTIONS.length - 1;

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // TODO: 로직 담당자가 답변을 저장하는 로직 추가
    if (isLastStep) {
      // TODO: 로직 담당자가 결과 페이지로 네비게이션하는 로직 추가
      alert('자가진단 완료! (결과 페이지로 이동)');
    } else {
      setCurrentStep(step => step + 1);
      setSelectedAnswer(null); // 다음 질문을 위해 선택 초기화
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
       
      {/* 헤더 -  TopNav 사용 (뒤로가기 + 타이틀) */}
      <Header variant="logoOnly" />
      <TopNav title="동아리 추천 테스트" />
        {/* TODO: 진행률 표시 바  */}
      <main className="flex-grow px-4 pt-6 space-y-6 pb-24">
        {/* 질문 텍스트 */}
        <h2 className="text-[18px] font-medium text-gray-900 leading-[1.35] tracking-[-0.03em] text-left">
          {currentQuestion.question}
        </h2>

        {/* 선택지 프레임 및 텍스트 */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            
            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className={`
                  w-full h-[84px] rounded-lg px-4 py-3 text-center transition-colors border
                  flex items-center justify-center
                  ${isSelected
                    ? 'bg-blue-50 border-blue-300' // 선택됨
                    : 'bg-gray-50 border-transparent' // 기본
                  }
                `}
              >
                {/* 선택지 텍스트 */}
                <span className="font-medium text-[16px] leading-[1.65] tracking-[-0.03em] text-gray-700">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </main>


      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4 py-3 bg-white border-t border-gray-100">
        <CTABtn 
          isActive={!!selectedAnswer} 
          onClick={handleNext}
        >
          {isLastStep ? '결과 보기' : '다음'}
        </CTABtn>
      </div>
    </div>
  );
};

export default ClubAssessmentPage;