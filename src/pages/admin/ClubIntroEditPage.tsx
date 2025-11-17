import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import PrimaryBtn from '../../components/ui/Button/PrimaryBtn';

const ClubIntroEditPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: API 연동 (소개글 수정 요청)
    alert('동아리 소개글이 수정되었습니다.');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="동아리 소개 수정" />
      
      <main className="flex-grow p-4 space-y-6">
        <p className="text-gray-500">
            동아리(ID: {clubId})의 소개글과 주요 활동 내용을 수정합니다.
        </p>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">동아리 소개</label>
            <textarea 
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none" 
                placeholder="동아리에 대해 소개해 주세요." 
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">주요 활동</label>
            <textarea 
                className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none" 
                placeholder="주요 활동 내용을 입력해 주세요." 
            />
        </div>
      </main>

      <div className="p-4 border-t border-gray-100">
        <PrimaryBtn isActive={true} onClick={handleSave} className="w-full">
          저장하기
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default ClubIntroEditPage;
