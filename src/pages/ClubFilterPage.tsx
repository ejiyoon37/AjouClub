// // src/pages/ClubFilterPage.tsx

// import React, { useEffect, useState } from 'react';
// import TopNav from '../components/common/TopNav';
// import PrimaryBtn from '../components/ui/Button/PrimaryBtn';
// import CTABtn from '../components/ui/Button/CTABtn';
// import ResetIcon from '../assets/icon/icn_reset_16.svg?react';
// import axios from 'axios';

// interface FilterOption {
//   id: number;
//   name: string;
// }

// const ClubFilterPage = () => {
//   const [fields, setFields] = useState<FilterOption[]>([]); // 희망 분야
//   const [types, setTypes] = useState<FilterOption[]>([]); // 동아리 분류
//   const [statuses, setStatuses] = useState<FilterOption[]>([]); // 모집 상태

//   const [selectedFields, setSelectedFields] = useState<number[]>([]);
//   const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
//   const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);

//   const toggleSelect = (
//     id: number,
//     selectedList: number[],
//     setSelectedList: React.Dispatch<React.SetStateAction<number[]>>
//   ) => {
//     setSelectedList(prev =>
//       prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
//     );
//   };

//   const resetFilters = () => {
//     setSelectedFields([]);
//     setSelectedTypes([]);
//     setSelectedStatuses([]);
//   };

//   const applyFilters = () => {
//     const query = {
//       type: selectedTypes,
//       category: selectedFields,
//       isRecruiting: selectedStatuses.includes(1), // 예시 처리
//     };
//     console.log('적용된 동아리 필터:', query);
//     // navigate('/explore/club?filter=...') 등 구현
//   };

//   const fetchFilterOptions = async () => {
//     try {
//       const res = await axios.get('/api/club/filter');
//       setFields(res.data.category || []);
//       setTypes(res.data.type || []);
//       setStatuses(res.data.isRecruiting || []);
//     } catch (error) {
//       console.error('필터 옵션 가져오기 실패:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFilterOptions();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <TopNav title="필터" />

//       {/* 희망 분야 */}
//       <section className="px-4 pt-6">
//         <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">희망 분야</h2>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {fields.map(option => (
//             <PrimaryBtn
//               key={option.id}
//               isActive={selectedFields.includes(option.id)}
//               onClick={() => toggleSelect(option.id, selectedFields, setSelectedFields)}
//             >
//               {option.name}
//             </PrimaryBtn>
//           ))}
//         </div>
//       </section>

//       {/* 동아리 분류 */}
//       <section className="px-4 pt-6">
//         <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">동아리 분류</h2>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {types.map(option => (
//             <PrimaryBtn
//               key={option.id}
//               isActive={selectedTypes.includes(option.id)}
//               onClick={() => toggleSelect(option.id, selectedTypes, setSelectedTypes)}
//             >
//               {option.name}
//             </PrimaryBtn>
//           ))}
//         </div>
//       </section>

//       {/* 모집 상태 */}
//       <section className="px-4 pt-6">
//         <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">모집 상태</h2>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {statuses.map(option => (
//             <PrimaryBtn
//               key={option.id}
//               isActive={selectedStatuses.includes(option.id)}
//               onClick={() => toggleSelect(option.id, selectedStatuses, setSelectedStatuses)}
//             >
//               {option.name}
//             </PrimaryBtn>
//           ))}
//         </div>
//       </section>

//       {/* 하단 버튼 */}
//       <div className="mt-auto px-4 py-3 flex items-center justify-between">
//         <button
//           className="flex items-center gap-1 text-base font-sm text-gray-700 leading-[1.35] tracking-[-0.03em]"
//           onClick={resetFilters}
//         >
//           <ResetIcon className="w-4 h-4" />
//           초기화
//         </button>

//         <div className="flex-grow ml-4">
//           <CTABtn isActive={true} onClick={applyFilters}>
//             적용하기
//           </CTABtn>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClubFilterPage;
// src/pages/ClubFilterPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // (새로 추가)
import TopNav from '../components/common/TopNav';
import PrimaryBtn from '../components/ui/Button/PrimaryBtn';
import CTABtn from '../components/ui/Button/CTABtn';
import ResetIcon from '../assets/icon/icn_reset_16.svg?react';
// (삭제) axios

interface FilterOption {
  // (수정) id 대신 string key 사용
  key: string;
  name: string;
}

// (새로 추가) API 응답 [user-provided-json-with-data] 기반 하드코딩 데이터
const fieldOptions: FilterOption[] = [
  { key: 'SPORTS', name: '스포츠' },
  { key: 'ACADEMIC', name: '학술' },
  { key: 'RELIGION', name: '종교' },
  { key: 'CULTURE_ART', name: '문화/예술' },
  { key: 'STARTUP', name: '창업' }, // (추정) Swagger [user-provided-json] 기반
  { key: 'SOCIAL', name: '사교' },
  { key: 'VOLUNTEER', name: '봉사' },
];

const typeOptions: FilterOption[] = [
  { key: '중앙동아리', name: '중앙동아리' },
  { key: '소학회', name: '소학회' },
];

const statusOptions: FilterOption[] = [
  { key: 'true', name: '모집중' },
];
// (여기까지 새로 추가)

const ClubFilterPage = () => {
  const navigate = useNavigate(); // (새로 추가)

  // (수정) 하드코딩된 데이터로 상태 초기화
  const [fields, setFields] = useState<FilterOption[]>(fieldOptions); 
  const [types, setTypes] = useState<FilterOption[]>(typeOptions); 
  const [statuses, setStatuses] = useState<FilterOption[]>(statusOptions); 

  // (수정) id(number) 대신 key(string) 배열 사용
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleSelect = (
    key: string, // (수정)
    selectedList: string[], // (수정)
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>> // (수정)
  ) => {
    setSelectedList(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setSelectedFields([]);
    setSelectedTypes([]);
    setSelectedStatuses([]);
  };

  const applyFilters = () => {
    // (수정) 실제 쿼리 파라미터 생성 및 페이지 이동
    const params = new URLSearchParams();
    
    // (참고) API는 다중 선택을 지원하지 않는 것으로 보이나, UI는 다중 선택을 지원합니다.
    // 여기서는 UI 기준(마지막 선택 값)으로 파라미터를 만듭니다.
    if (selectedTypes.length > 0) {
      params.append('type', selectedTypes[selectedTypes.length - 1]);
    }
    if (selectedFields.length > 0) {
      params.append('category', selectedFields[selectedFields.length - 1]);
    }
    if (selectedStatuses.length > 0) {
      params.append('isRecruiting', selectedStatuses[selectedStatuses.length - 1]);
    }
    
    console.log('적용된 동아리 필터:', params.toString());
    // (수정) useClubs 훅 [ejiyoon37/ajouclub/AjouClub-6412194880bd7a3c09b6ca957f6297319191956b/src/Hooks/useClubs.ts]가 필터를 인식하도록 /clubs로 이동
    navigate(`/clubs?${params.toString()}`);
  };

  // (삭제) fetchFilterOptions 및 useEffect

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="필터" />

      {/* 희망 분야 */}
      <section className="px-4 pt-6">
        <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">희망 분야</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {fields.map(option => (
            <PrimaryBtn
              key={option.key} // (수정)
              isActive={selectedFields.includes(option.key)} // (수정)
              onClick={() => toggleSelect(option.key, selectedFields, setSelectedFields)} // (수정)
            >
              {option.name}
            </PrimaryBtn>
          ))}
        </div>
      </section>

      {/* 동아리 분류 */}
      <section className="px-4 pt-6">
        <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">동아리 분류</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {types.map(option => (
            <PrimaryBtn
              key={option.key} // (수정)
              isActive={selectedTypes.includes(option.key)} // (수정)
              onClick={() => toggleSelect(option.key, selectedTypes, setSelectedTypes)} // (수정)
            >
              {option.name}
            </PrimaryBtn>
          ))}
        </div>
      </section>

      {/* 모집 상태 */}
      <section className="px-4 pt-6">
        <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">모집 상태</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {statuses.map(option => (
            <PrimaryBtn
              key={option.key} // (수정)
              isActive={selectedStatuses.includes(option.key)} // (수정)
              onClick={() => toggleSelect(option.key, selectedStatuses, setSelectedStatuses)} // (수정)
            >
              {option.name}
            </PrimaryBtn>
          ))}
        </div>
      </section>

      {/* 하단 버튼 */}
      <div className="mt-auto px-4 py-3 flex items-center justify-between">
        <button
          className="flex items-center gap-1 text-base font-sm text-gray-700 leading-[1.35] tracking-[-0.03em]"
          onClick={resetFilters}
        >
          <ResetIcon className="w-4 h-4" />
          초기화
        </button>

        <div className="flex-grow ml-4">
          <CTABtn isActive={true} onClick={applyFilters}>
            적용하기
          </CTABtn>
        </div>
      </div>
    </div>
  );
};

export default ClubFilterPage;