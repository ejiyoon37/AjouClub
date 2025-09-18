import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useRecruitments from '../../Hooks/useRecruitments';
import RecruitmentCard from '../common/Card/Card_recruitment';
import Pagination from '../common/Pagination';
import SeeAllButton from '../common/SeeAllBtn';

const POSTS_PER_PAGE = 6;

const RecruitingSection = () => {
  const navigate = useNavigate();
  const { posts, isLoading, error } = useRecruitments();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <section className="space-y-4">
      {/* Section Title + 전체보기 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">지금 모집중인 공고</h2>
        <SeeAllButton navigateTo="/recruitment" />
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {paginatedPosts.map((post) => (
          <RecruitmentCard
            key={post.id}
            recruitmentId={post.id}
            imageUrl={post.imageUrl}
            title={post.title}
            recruitmentStatus={post.recruitmentStatus}
            dDay={post.dDay}
            viewCount={post.viewCount}
            saveCount={post.saveCount}
            isScrappedInitially={post.isScrappedInitially}
            />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.min(totalPages, 10)}
          onPrevPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      )}
    </section>
  );
};

export default RecruitingSection;
