import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Club, ClubType } from '../types/club';

interface ClubFilterParams {
  type?: string;
  category?: string;
  isRecruiting?: boolean;
  department?: string;
  sort?: 'recent' | 'alphabetical';
  useAllEndpoint?: boolean; // 추가: 전체 조회 여부
}

interface ClubApiResponse {
  id: number;
  name: string;
  clubType: string;
  logoUrl: string;
  description?: string;
  instagram?: string;
  homepage?: string;
}

const convertToClubType = (type: string): ClubType => {
  if (type === '중앙동아리' || type === '소학회') return type;
  throw new Error(`Invalid clubType: ${type}`);
};

const useClubs = (filters: ClubFilterParams) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
  }, [filters]);

  return { clubs, isLoading, error };
};

export default useClubs;