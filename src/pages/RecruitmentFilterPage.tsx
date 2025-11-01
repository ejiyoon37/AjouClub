// src/pages/RecruitmentFilterPage.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/common/TopNav';
import CTABtn from '../components/ui/Button/CTABtn';
import ResetIcon from '../assets/icon/icn_reset_16.svg?react';
import SelectField from '../components/ui/Field/SelectField';
// (수정) PrimaryBtn -> FilterChipButton (Figma: image_df07e3.png)
import FilterChipButton from '../components/ui/Button/PrimaryBtn'; // PrimaryBtn이 Figma 스펙과 일치

// (새로 추가) 섹션 타이틀 (Figma: image_df0480.png)
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">
    {title}
  </h2>
);

// (새로 추가) 학과 선택 라벨 (Figma: image_df082a.png)
const SectionLabel = ({ label }: { label: string }) => (
  <p className="text-[14px] font-medium text-gray-400 leading-[1.35] tracking-[-0.03em] mb-2">
    {label}
  </p>
);

// (수정) API에 의존하지 않는 Mock 데이터 (Figma UI 구현용)
const fieldOptions: string[] = ['스포츠', '학술', '종교', '문화예술', '창업', '사교', '봉사'];
const typeOptions: string[] = ['중앙동아리', '소학회'];
const statusOptions: string[] = ['모집중', '모집 마감'];
const departmentOptions: string[] = ['전체', '디지털미디어학과', '소프트웨어학과', '물리학과', '불어불문학과', '건축학과'];

const RecruitmentFilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // (새로 추가)
  // (새로 추가) 이전 필터 값 복원
  const initialFilters = location.state?.filters || {};

  // (수정) 상태 값들을 human-readable string으로 관리
  const [selectedFields, setSelectedFields] = useState<string[]>(initialFilters.categories || []);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialFilters.types || []);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters.statuses || []);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(initialFilters.department || '');

  // (수정) 다중 선택 토글 로직
  const toggleSelect = (
    item: string,
    selectedList: string[],
    setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const resetFilters = () => {
    setSelectedFields([]);
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSelectedDepartment('');
  };

  const applyFilters = () => {
    // (수정) API 키가 아닌 선택된 라벨 자체를 state로 전달
    const filters = {
      categories: selectedFields,
      types: selectedTypes,
      statuses: selectedStatuses,
      department: selectedDepartment,
    };

    console.log('적용된 모집공고 필터 (Front-end):', filters);
    // (수정) /recruitment 페이지로 state와 함께 이동
    navigate('/recruitment', { state: { filters }, replace: true });
  };

  const getFilterCount = () => {
    return selectedFields.length + selectedTypes.length + selectedStatuses.length + (selectedDepartment ? 1 : 0);
  };
  const filterCount = getFilterCount();


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="필터" />

      {/* (수정) Figma(image_df0442.png) 레이아웃/스타일 적용 */}
      <main className="flex-grow p-4 space-y-6">
        {/* 희망 분야 */}
        <section>
          <SectionTitle title="희망 분야" />
          <div className="flex flex-wrap gap-2 mt-3">
            {fieldOptions.map(option => (
              <FilterChipButton
                key={option}
                isActive={selectedFields.includes(option)}
                onClick={() => toggleSelect(option, selectedFields, setSelectedFields)}
              >
                {option}
              </FilterChipButton>
            ))}
          </div>
        </section>

        {/* 동아리 분류 */}
        <section>
          <SectionTitle title="동아리 분류" />
          <div className="flex flex-wrap gap-2 mt-3">
            {typeOptions.map(option => (
              <FilterChipButton
                key={option}
                isActive={selectedTypes.includes(option)}
                onClick={() => toggleSelect(option, selectedTypes, setSelectedTypes)}
              >
                {option}
              </FilterChipButton>
            ))}
          </div>
        </section>
        
        {/* (새로 추가) 학과 선택 (Figma: image_df089d.png) */}
        <section>
          <SectionTitle title="어떤 학과이신가요?" />
          <SectionLabel label="가입 가능한 소학회를 찾아드릴게요!" />
          <SelectField
            options={departmentOptions}
            value={selectedDepartment || null}
            onChange={(val) => setSelectedDepartment(val)}
            placeholder='전체'
          />
        </section>

        {/* 모집 상태 */}
        <section>
          <SectionTitle title="모집 상태" />
          <div className="flex flex-wrap gap-2 mt-3">
            {statusOptions.map(option => (
              <FilterChipButton
                key={option}
                isActive={selectedStatuses.includes(option)}
                onClick={() => toggleSelect(option, selectedStatuses, setSelectedStatuses)}
              >
                {option}
              </FilterChipButton>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 버튼 */}
        <div className="mt-auto px-4 py-3 flex items-center justify-between bg-white border-t border-gray-100">
        <button
            className="flex items-center gap-1 text-base font-medium text-gray-700 leading-[1.35] tracking-[-0.03em]"
            onClick={resetFilters}
        >
            <ResetIcon className="w-4 h-4" />
            초기화
        </button>

        <div className="flex-grow ml-4">
            <CTABtn isActive={true} onClick={applyFilters}>
              {/* (수정) 필터 개수 적용 */}
              {filterCount > 0 ? `적용하기 (${filterCount})` : '적용하기'}
            </CTABtn>
        </div>
        </div>
    </div>
  );
};

export default RecruitmentFilterPage;