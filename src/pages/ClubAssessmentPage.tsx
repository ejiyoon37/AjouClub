// src/pages/ClubAssessmentPage.tsx
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import CTABtn from '../components/ui/Button/CTABtn';
import Header from '../components/common/Header';

// 분야 타입 정의
type Category = '스포츠' | '학술' | '종교' | '문화/예술' | '사교' | '봉사';

// 각 선택지에 대한 점수 매핑
// 구조: [질문ID][선택지인덱스] = { 분야: 점수 }
const SCORE_MAP: Record<
  number,
  Record<number, Partial<Record<Category, number>>>
> = {
  1: {
    0: { 스포츠: 1, 종교: 1, 사교: 3 }, // '맛있는 음식과 함께 여럿이 웃고 떠들며...'
    1: { 스포츠: 1, 학술: 3 }, // '무언가를 배우고 익혀서...'
    2: { '문화/예술': 3 }, // '나의 생각과 감성을 담아...'
    3: { 종교: 1, 봉사: 3 }, // '내가 가진 재능이나 시간으로...'
  },
  2: {
    0: { 스포츠: 3 }, // '땀을 흘리고 몸을 움직이면서...'
    1: { 학술: 3, 종교: 1, 봉사: 1 }, // '평소 궁금했던 주제에 대해...'
    2: { 종교: 3 }, // '비슷한 가치관을 가진 사람들과...'
    3: { '문화/예술': 2, 사교: 3 }, // '새롭고 재미있는 아이디어를...'
  },
  3: {
    0: { 스포츠: 3, 학술: 1 }, // '실력을 측정하는 테스트나...'
    1: { 학술: 3 }, // '자료를 꼼꼼히 조사하고...'
    2: { '문화/예술': 1, 봉사: 3 }, // '이웃을 위해 직접 만든 물건을...'
    3: { 스포츠: 1, 학술: 1, 종교: 1, '문화/예술': 1, 사교: 3, 봉사: 1 }, // '새로운 사람에게 먼저 다가가...'
  },
  4: {
    0: { 스포츠: 3, 학술: 2 }, // '외부 대회나 평가에서...'
    1: { 종교: 2, 봉사: 3 }, // '어떤 대가 없이 순수하게...'
    2: { 학술: 1, '문화/예술': 3 }, // '창의적인 아이디어가...'
    3: { 학술: 3 }, // '복잡한 현상의 원리를...'
  },
  5: {
    0: { 스포츠: 1, 사교: 3 }, // '지나치게 개인적이고...'
    1: { 학술: 1, '문화/예술': 3 }, // '활동이 결과 없이...'
    2: { 종교: 2, 봉사: 3 }, // '공동체보다 특정 소수의...'
    3: { 학술: 3 }, // '재미있게 놀기는 하지만...'
  },
};

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
    question: '동아리 모임에 갈 때, 가장 기대하는 주된 활동은 무엇인가요?',
    options: [
      '땀을 흘리고 몸을 움직이면서 스트레스를 날려버리는 활동.',
      '평소 궁금했던 주제에 대해 깊이 토론하고 새로운 지식을 얻는 것.',
      '비슷한 가치관을 가진 사람들과 내면의 이야기를 나누는 시간.',
      '새롭고 재미있는 아이디어를 내서 다 같이 놀이처럼 실행해 보는 것.',
    ],
  },
  {
    id: 3,
    question:
      '만약 동아리 활동을 숙제라고 한다면, 당신이 가장 재미있게 할 수 있는 숙제는 무엇인가요?',
    options: [
      '실력을 측정하는 테스트나 경쟁, 또는 복잡한 규칙을 외우는 것.',
      '자료를 꼼꼼히 조사하고, 복잡한 내용을 정리해서 발표하는 것.',
      '이웃을 위해 직접 만든 물건을 기부하거나, 나눔 행사를 계획하는 것.',
      '새로운 사람에게 먼저 다가가 연락처를 교환하고 친분을 쌓는 것.',
    ],
  },
  {
    id: 4,
    question:
      '동아리에서 당신의 참여 동기가 가장 강력해지는 상황은 언제인가요?',
    options: [
      '외부 대회나 평가에서 인정받아 우리 동아리의 실력을 증명했을 때.',
      '어떤 대가 없이 순수하게 타인을 돕고, 따뜻한 마음을 공유했을 때.',
      '창의적인 아이디어가 현실화되어 눈으로 볼 수 있는 멋진 작품이 되었을 때.',
      '복잡한 현상의 원리를 이해하고, 명쾌한 해답을 찾아냈을 때.',
    ],
  },
  {
    id: 5,
    question: '동아리가 가장 매력 없게 느껴지는 상황은 언제인가요?',
    options: [
      '지나치게 개인적이고, 다른 사람과의 교류가 거의 없을 때.',
      '활동이 결과 없이 단순한 유흥으로만 끝날 때.',
      '공동체보다 특정 소수의 이익을 챙기는 것처럼 보일 때.',
      '재미있게 놀기는 하지만, 아무런 발전이 없는 것처럼 느껴질 때.',
    ],
  },
];

const ClubAssessmentPage = () => {
  //const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<
    Array<{ questionId: number; optionIndex: number }>
  >([]);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
  const isLastStep = currentStep === ASSESSMENT_QUESTIONS.length - 1;

  const handleSelectOption = (option: string) => {
    setSelectedAnswer(option);
  };

  // 점수 계산 함수
  const calculateScores = (): Record<Category, number> => {
    const scores: Record<Category, number> = {
      스포츠: 0,
      학술: 0,
      종교: 0,
      '문화/예술': 0,
      사교: 0,
      봉사: 0,
    };

    answers.forEach((answer) => {
      const questionScores = SCORE_MAP[answer.questionId]?.[answer.optionIndex];
      if (questionScores) {
        Object.entries(questionScores).forEach(([category, score]) => {
          if (score) {
            scores[category as Category] += score;
          }
        });
      }
    });

    return scores;
  };

  // 결과 결정 함수
  const determineResult = (): Category[] => {
    const scores = calculateScores();

    // 최고 점수 찾기
    const maxScore = Math.max(...Object.values(scores));
    const topCategories = (Object.entries(scores) as [Category, number][])
      .filter(([_, score]) => score === maxScore)
      .map(([category]) => category);

    // 최고 점수가 하나면 바로 반환
    if (topCategories.length === 1) {
      return topCategories;
    }

    // 동점이면 +3 점수를 가장 많이 받은 분야 찾기
    const plusThreeCounts: Record<Category, number> = {
      스포츠: 0,
      학술: 0,
      종교: 0,
      '문화/예술': 0,
      사교: 0,
      봉사: 0,
    };

    answers.forEach((answer) => {
      const questionScores = SCORE_MAP[answer.questionId]?.[answer.optionIndex];
      if (questionScores) {
        Object.entries(questionScores).forEach(([category, score]) => {
          if (score === 3) {
            plusThreeCounts[category as Category]++;
          }
        });
      }
    });

    // 동점 분야 중 +3 점수를 가장 많이 받은 분야 찾기
    const topPlusThreeCount = Math.max(
      ...topCategories.map((cat) => plusThreeCounts[cat])
    );
    const finalCategories = topCategories.filter(
      (cat) => plusThreeCounts[cat] === topPlusThreeCount
    );

    return finalCategories;
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // 현재 질문의 선택된 옵션 인덱스 찾기
    const optionIndex = currentQuestion.options.indexOf(selectedAnswer);
    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, optionIndex },
    ];
    setAnswers(newAnswers);

    if (isLastStep) {
      // 모든 답변이 완료되었으므로 결과 계산
      const results = determineResult();
      const resultText =
        results.length === 1
          ? `당신에게 추천하는 동아리 분야는: ${results[0]}입니다!`
          : `당신에게 추천하는 동아리 분야는: ${results.join(', ')}입니다!`;
      alert(resultText);
    } else {
      setCurrentStep((step) => step + 1);
      setSelectedAnswer(null); // 다음 질문을 위해 선택 초기화
    }
  };

  const totalSteps = ASSESSMENT_QUESTIONS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 로고 헤더 */}
      <Header variant="logoOnly" />
      {/* 진행률 바 */}
      <div className="w-full h-1 bg-gray-100">
        <div
          className="h-full bg-[#3168FF] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <main className="flex-grow px-4 pt-6 space-y-6 pb-24">
        {/* 질문 텍스트 */}
        <h2 className="text-[18px] font-medium text-gray-900 leading-[1.35] tracking-[-0.03em] text-left font-sans py-6">
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
                  w-full h-[84px] rounded-lg px-4 py-3 text-center transition-colors border-2
                  flex items-center justify-center
                  ${
                    isSelected
                      ? 'bg-[#EAF0FF] border-[#3168FF]' // 선택됨
                      : 'bg-[#F6F7F8] border-transparent' // 기본
                  }
                `}
              >
                {/* 선택지 텍스트 */}
                <span
                  className={`text-base leading-[1.65] tracking-[-0.03em] text-center font-sans ${
                    isSelected
                      ? 'font-medium text-black'
                      : 'font-medium text-[#5A6167]'
                  }`}
                >
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4 py-3 bg-white border-t border-gray-100">
        <CTABtn isActive={!!selectedAnswer} onClick={handleNext}>
          {isLastStep ? '결과 보기' : '다음'}
        </CTABtn>
      </div>
    </div>
  );
};

export default ClubAssessmentPage;
