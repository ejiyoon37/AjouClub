import { useEffect, useState } from 'react';
import type { Club } from '../types/club';
import { mockClubs } from '../mocks/mockClubs'; // ✅ mock 데이터 import

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';
  useAllEndpoint?: boolean;
  page?: number; // ✅ 페이징을 위한 page, size 추가
  size?: number;
}

const useClubs = (filters: ClubFilterParams = {}) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMockClubs = async () => {
      setIsLoading(true);
      try {
        // ✅ 페이징 처리
        const { page = 1, size = 6 } = filters;
        const startIdx = (page - 1) * size;
        const endIdx = startIdx + size;

        // ✅ 일부러 300ms 지연 (비동기 흉내)
        await new Promise((res) => setTimeout(res, 300));
        setClubs(mockClubs.slice(startIdx, endIdx));
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockClubs();

    // --- 🔽 실 API용 코드 (필요 시 복구) ---
    /*
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        const url = filters.useAllEndpoint ? '/api/club/all' : '/api/club/filter';
        const { data } = await axios.get<{ status: number; message: string; data: ClubApiResponse[] }>(url, {
          params: filters.useAllEndpoint ? undefined : {
            type: filters.type,
            category: filters.category,
            isRecruiting: filters.isRecruiting,
            department: filters.department,
            sort: filters.sort,
          },
        });

        const mappedClubs: Club[] = data.data.map((club) => ({
          clubId: club.id,
          clubName: club.name,
          clubType: convertToClubType(club.clubType),
          profileImageUrl: club.logoUrl,
          description: club.description,
          contact: {
            instagramUrl: club.instagram,
            homepageUrl: club.homepage,
          },
        }));

        setClubs(mappedClubs);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClubs();
    */
  }, [filters]);

  return { clubs, isLoading, error };
};

export default useClubs;