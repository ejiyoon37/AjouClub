import  { useState } from 'react';

type Tab = '모집공고' | '동아리 소개';

interface ClubDetailTabProps {
  defaultTab?: Tab;
  onTabChange: (tab: Tab) => void;
}

const ClubDetailTab = ({ defaultTab = '모집공고', onTabChange }: ClubDetailTabProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex w-full border-b border-gray-100">
      {(['모집공고', '동아리 소개'] as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`flex-1 text-center py-3 text-[16px] font-semibold leading-[135%] tracking-[-0.03em]
            ${activeTab === tab ? 'text-gray-900' : 'text-gray-300'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ClubDetailTab;