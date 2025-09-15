import Header from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import SearchField from '../components/ui/Field/TextField_search';
import HomeBanner from '../components/homepage/HomeBanner';
import RecruitingSection from '../components/homepage/RecruitingSection';
import ClubPreviewCarousel from '../components/homepage/ClubPreviewCarousel';

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <Header variant="home" />

      {/* Content */}
      <main className="flex-grow px-4 pb-20 space-y-6">
        {/* Search */}
        <SearchField placeholder="동아리를 검색해 보세요!" />

        {/* Banner */}
        <HomeBanner />

        {/* 모집중인 공고 */}
        <RecruitingSection />

        {/* 동아리 둘러보기 */}
        <ClubPreviewCarousel />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}