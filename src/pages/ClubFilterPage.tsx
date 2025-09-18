// src/pages/ClubFilterPage.tsx

import React, { useEffect, useState } from 'react';
import TopNav from '../components/common/TopNav';
import PrimaryBtn from '../components/ui/Button/PrimaryBtn';
import CTABtn from '../components/ui/Button/CTABtn';
import ResetIcon from '../assets/icon/icn_reset_16.svg?react';
import axios from 'axios';

interface FilterOption {
  id: number;
  name: string;
}

const ClubFilterPage = () => {
  const [fields, setFields] = useState<FilterOption[]>([]); // 희망 분야
  const [types, setTypes] = useState<FilterOption[]>([]); // 동아리 분류
  const [statuses, setStatuses] = useState<FilterOption[]>([]); // 모집 상태

  const [selectedFields, setSelectedFields] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>([]);

  const toggleSelect = (
    id: number,
    selectedList: number[],
    setSelectedList: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    setSelectedList(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSelectedFields([]);
    setSelectedTypes([]);
    setSelectedStatuses([]);
  };

  const applyFilters = () => {
    const query = {
      type: selectedTypes,
      category: selectedFields,
      isRecruiting: selectedStatuses.includes(1), // 예시 처리
    };
    console.log('적용된 동아리 필터:', query);
    // navigate('/explore/club?filter=...') 등 구현
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await axios.get('/api/club/filter');
      setFields(res.data.category || []);
      setTypes(res.data.type || []);
      setStatuses(res.data.isRecruiting || []);
    } catch (error) {
      console.error('필터 옵션 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="필터" />

      {/* 희망 분야 */}
      <section className="px-4 pt-6">
        <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">희망 분야</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {fields.map(option => (
            <PrimaryBtn
              key={option.id}
              isActive={selectedFields.includes(option.id)}
              onClick={() => toggleSelect(option.id, selectedFields, setSelectedFields)}
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
              key={option.id}
              isActive={selectedTypes.includes(option.id)}
              onClick={() => toggleSelect(option.id, selectedTypes, setSelectedTypes)}
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
              key={option.id}
              isActive={selectedStatuses.includes(option.id)}
              onClick={() => toggleSelect(option.id, selectedStatuses, setSelectedStatuses)}
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
