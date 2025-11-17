// src/components/homepage/RecruitingSection.tsx

import { useState , useMemo } from 'react';
//import { useNavigate } from 'react-router-dom';

import useRecruitments from '../../Hooks/useRecruitments';
import RecruitmentCard from '../common/Card/Card_recruitment';
import Pagination from '../common/Pagination';
import SeeAllButton from '../common/SeeAllBtn';
import { useAuthStore } from '../../stores/useAuthStore';
import { useMyPageData } from '../../Hooks/useMypageData';

const POSTS_PER_PAGE = 6;

const RecruitingSection = () => {
  //const navigate = useNavigate();
 const [currentPage, setCurrentPage] = useState(1);
 const { posts, isLoading: isPostsLoading, error } = useRecruitments('main');
 const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
 const { favorites, isLoading: isFavoritesLoading } = useMyPageData();

 const postsWithUserScrapStatus = useMemo(() => {
   if (!isLoggedIn || !favorites) return posts; // 로그인 안했으면 원본 반환
   
   const favoriteIdSet = new Set(favorites.map(fav => fav.recruitmentId));
   
   return posts.map(post => ({
     ...post,
     isScrapped: favoriteIdSet.has(post.recruitmentId), // 실제 스크랩 상태 반영
   }));
 }, [posts, favorites, isLoggedIn]);

 const totalPages = Math.ceil(postsWithUserScrapStatus.length / POSTS_PER_PAGE);
 const paginatedPosts = postsWithUserScrapStatus.slice(
   (currentPage - 1) * POSTS_PER_PAGE,
   currentPage * POSTS_PER_PAGE
 );


 const isLoading = isPostsLoading || (isLoggedIn && isFavoritesLoading);
 if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;


  return (
    <section className="space-y-4">
      {/* ... (Section Title 동일) ... */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">지금 모집중인 공고</h2>
        <SeeAllButton navigateTo="/recruitment" />
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {paginatedPosts.map((post) => (
          <RecruitmentCard
            key={post.recruitmentId} 
            recruitmentId={post.recruitmentId} 
            clubId={post.clubId} 
            images={post.images} 
            title={post.title}
            status={post.status} 
            dDay={post.dDay}
            viewCount={post.viewCount} 
            scrapCount={post.scrapCount} 
            isScrappedInitially={post.isScrapped} 
            />
        ))}
      </div>

      {/* ... (Pagination 동일) ... */}
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