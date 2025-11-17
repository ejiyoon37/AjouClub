import { useParams, useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import PrimaryBtn from '../../components/ui/Button/PrimaryBtn';

const ClubEditPage = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const navigate = useNavigate();

  const handleSave = () => {
    // TODO: API 연동 (정보 수정 요청)
    alert('동아리 정보가 수정되었습니다.');
    navigate(-1); // 뒤로 가기
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="동아리 정보 수정" />
      
      <main className="flex-grow p-4 space-y-6">
        <h2 className="text-lg font-semibold">기본 정보 관리</h2>
        <p className="text-gray-500">
          동아리 ID: {clubId}의 정보를 수정하는 페이지입니다.<br/>
          (로고, 동아리명, 대표 연락처 등)
        </p>
        
        {/* 입력 폼 예시 */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">동아리 이름</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg" placeholder="동아리 이름을 입력하세요" />
        </div>
      </main>

      <div className="p-4 border-t border-gray-100">
        <PrimaryBtn isActive={true} onClick={handleSave} className="w-full">
          수정 완료
        </PrimaryBtn>
      </div>
    </div>
  );
};

export default ClubEditPage;