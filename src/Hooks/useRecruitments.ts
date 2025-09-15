// import { useState, useEffect } from 'react';

// // API 응답 타입
// interface ApiResponse<T> {
//   status: number;
//   message: string;
//   data: T;
// }

// // 모집 공고 데이터 타입
// export interface RecruitmentPost {
//   id: number;
//   imageUrl: string;
//   title: string;
//   recruitmentStatus: 'regular' | 'd-day' | 'end';
//   dDay?: number;
//   viewCount: number;
//   saveCount: number;
//   isScrappedInitially?: boolean;
// }

// // 홈 화면에 표시될 메인 공고
// const getMainRecruitmentPosts = async (): Promise<RecruitmentPost[]> => {
//   const response = await fetch('/api/recruitments/main');
//   if (!response.ok) throw new Error('서버 응답 실패');
  
//   const result: ApiResponse<RecruitmentPost[]> = await response.json();
//   if (result.status !== 200 && result.status !== 0) {
//     throw new Error(result.message || 'API 에러');
//   }
//   return result.data;
// };


// const useRecruitments = () => {
//   const [posts, setPosts] = useState<RecruitmentPost[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getMainRecruitmentPosts();
//         setPosts(data);
//       } catch (err) {
//         if (err instanceof Error) setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []); 

//   return { posts, isLoading, error };
// };

// export default useRecruitments;

import { useState, useEffect } from 'react';
import { mockRecruitments } from '../mocks/mockRecruitments';

export interface RecruitmentPost {
  id: number;
  imageUrl: string;
  title: string;
  recruitmentStatus: 'regular' | 'd-day' | 'end';
  dDay?: number;
  viewCount: number;
  saveCount: number;
  isScrappedInitially?: boolean;
}

// 👇 실제 API 대신 mock 데이터 반환
const getMainRecruitmentPosts = async (): Promise<RecruitmentPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecruitments);
    }, 300); // 300ms 지연으로 비동기 느낌
  });
};

const useRecruitments = () => {
  const [posts, setPosts] = useState<RecruitmentPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMainRecruitmentPosts();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { posts, isLoading, error };
};

export default useRecruitments;