// src/pages/ClubFilterPage.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNav from '../components/common/TopNav';
import CTABtn from '../components/ui/Button/CTABtn';
import ResetIcon from '../assets/icon/icn_reset_16.svg?react';
import SelectField from '../components/ui/Field/SelectField';
import PrimaryBtn from '../components/ui/Button/PrimaryBtn'; // (수정) PrimaryBtn 사용

// (새로 추가) 섹션 타이틀 (Figma: image_df7848.png)
const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-[16px] font-semibold text-gray-900 leading-[1.35] tracking-[-0.03em]">
    {title}
  </h2>
);

// (새로 추가) 학과 선택 라벨 (Figma: image_df78a7.png)
const SectionLabel = ({ label }: { label: string }) => (
  <p className="text-[14px] font-medium text-gray-400 leading-[1.35] tracking-[-0.03em] mt-1">
    {label}
  </p>
);

// (수정) 동아리 필터용 선택지 (Figma 이미지 기준)
const clubTypes = ['중앙동아리', '소학회']; // (image_df7848.png)
const categories = ['스포츠', '학술', '종교', '문화예술', '창업', '사교', '봉사']; // (image_df7867.png)
const recruitingOptions = ['모집중']; // (image_df7885.png)
const departments = ['전체', '디지털미디어학과', '소프트웨어학과', '물리학과', '불어불문학과', '건축학과']; // (image_df78a7.png)

const ClubFilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFilters = location.state?.filters || {};

  // (수정) 동아리 필터 State (API: image_df65bf.jpg)
  const [selectedType, setSelectedType] = useState<string | null>(initialFilters.type || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialFilters.category || null);
  const [selectedRecruiting, setSelectedRecruiting] = useState<boolean>(initialFilters.isRecruiting || false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(initialFilters.department || '');

  const handleReset = () => {
    setSelectedType(null);
    setSelectedCategory(null);
    setSelectedRecruiting(false);
    setSelectedDepartment('');
  };

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {};
    
    // (수정) API(image_df65bf.jpg) 파라미터에 맞게 매핑
    if (selectedType) filters.type = selectedType;
    if (selectedCategory) filters.category = selectedCategory;
    if (selectedDepartment && selectedDepartment !== '전체') filters.department = selectedDepartment;
    if (selectedRecruiting) filters.isRecruiting = true; // useClubs에서 'recruiting: true'로 변환

    navigate('/clubs', {
      state: { filters },
      replace: true, 
    });
  };

  const getFilterCount = () => {
    let count = 0;
    if (selectedType) count++;
    if (selectedCategory) count++;
    if (selectedRecruiting) count++;
    if (selectedDepartment && selectedDepartment !== '전체') count++;
    return count;
  };
  const filterCount = getFilterCount();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav title="필터" />
      
      {/* (수정) Figma(image_df74a3.jpg) 레이아웃 적용 */}
      <main className="flex-grow p-4 space-y-6">
        {/* 초기화 버튼 */}
        <div className="flex justify-end">
          <button onClick={handleReset} className="flex items-center gap-1">
            <ResetIcon />
            <span className="text-[12px] font-medium text-gray-600">초기화</span>
          </button>
        </div>

        {/* 동아리 분류 (API: type) */}
        <section className="space-y-3">
          <SectionTitle title="동아리 분류" />
          <div className="flex flex-wrap gap-2">
            {clubTypes.map(type => (
              <PrimaryBtn
                key={type}
                isActive={selectedType === type}
                onClick={() => setSelectedType(type === selectedType ? null : type)}
              >
                {type}
              </PrimaryBtn>
            ))}
          </div>
        </section>

        {/* 희망 분야 (API: category) */}
        <section className="space-y-3">
          <SectionTitle title="희망 분야" />
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <PrimaryBtn
                key={cat}
                isActive={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              >
                {cat}
              </PrimaryBtn>
            ))}
          </div>
        </section>

        {/* 학과 (API: department) */}
        <section className="space-y-3">
          <SectionTitle title="어떤 학과이신가요?" />
          <SectionLabel label="가입 가능한 소학회를 찾아드릴게요!" />
          <SelectField
            options={departments}
            value={selectedDepartment || null}
            onChange={(val) => setSelectedDepartment(val)}
            placeholder="전체"
          />
        </section>

        {/* 모집 여부 (API: recruiting) */}
        <section className="space-y-3">
          <SectionTitle title="모집 여부" />
          <div className="flex flex-wrap gap-2">
            {recruitingOptions.map(opt => (
              <PrimaryBtn
                key={opt}
                isActive={selectedRecruiting}
                onClick={() => setSelectedRecruiting(!selectedRecruiting)}
              >
                {opt}
              </PrimaryBtn>
            ))}
          </div>
        </section>
      </main>

      {/* (수정) 하단 버튼 레이아웃 */}
      <div className="mt-auto px-4 py-3 flex items-center justify-between bg-white border-t border-gray-100">
        <button
            className="flex items-center gap-1 text-base font-medium text-gray-700 leading-[1.35] tracking-[-0.03em]"
            onClick={handleReset}
        >
            <ResetIcon className="w-4 h-4" />
            초기화
        </button>
        <div className="flex-grow ml-4">
          <CTABtn isActive={true} onClick={handleApplyFilters}>
            {filterCount > 0 ? `적용하기 (${filterCount})` : '적용하기'}
          </CTABtn>
        </div>
      </div>
    </div>
  );
};

export default ClubFilterPage;