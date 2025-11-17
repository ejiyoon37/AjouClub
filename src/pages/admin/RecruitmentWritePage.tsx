import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import PrimaryBtn from '../../components/ui/Button/PrimaryBtn';

const RecruitmentWritePage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();

  const handleSubmit = () => {
    // TODO: API 연동 (공고 생성 요청)
    alert('모집 공고가 등록되었습니다.');
    navigate(`/clubs/${clubId}`); // 해당 동아리 상세페이지로 이동
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="모집 공고 작성" />
      
      <main className="flex-grow p-4 space-y-6">
        <p className="text-gray-500">
            동아리(ID: {clubId})의 새로운 모집 공고를 작성합니다.
        </p>

        {/* 입력 폼 예시 */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">공고 제목</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg" placeholder="예: 2025년 신입 부원 모집" />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">모집 내용</label>
            <textarea className="w-full h-40 p-3 border border-gray-200 rounded-lg resize-none" placeholder="내용을 입력하세요" />
        </div>
      </main>

      <div className="p-4 border-t border-gray-100">
        <PrimaryBtn isActive={true} onClick={handleSubmit} className="w-full">
          등록하기
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default RecruitmentWritePage;