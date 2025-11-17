// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { parseJwt } from '../utils/jwtDecode'; // 위에서 만든 유틸 import
import type { UserInfo } from '../types/user';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: UserInfo | null;
  setAuth: (auth: { isLoggedIn: boolean; accessToken: string | null; user: UserInfo | null }) => void;
  logout: () => void;
  rehydrateAuth: () => void;
}

const STORAGE_KEY = 'auth';

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,

  setAuth: ({ isLoggedIn, accessToken, user }) => {
    // 1. 토큰이 있으면 디코딩하여 권한 정보 병합
    let updatedUser = user;
    if (accessToken && user) {
      const payload = parseJwt(accessToken);
      if (payload) {
        updatedUser = {
          ...user,
          roles: payload.roles || [],
          managedClubIds: payload.managed_clubs || [],
        };
      }
    }

    set({ isLoggedIn, accessToken, user: updatedUser });

    if (accessToken && updatedUser) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accessToken, user: updatedUser })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ isLoggedIn: false, accessToken: null, user: null });
  },

  rehydrateAuth: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (parsed.accessToken && parsed.user) {
        // 새로고침 시에도 토큰 재검증 -뺄까말까
        const payload = parseJwt(parsed.accessToken);
        const updatedUser = payload ? {
            ...parsed.user,
            roles: payload.roles || [],
            managedClubIds: payload.managed_clubs || [],
        } : parsed.user;

        set({
          isLoggedIn: true,
          accessToken: parsed.accessToken,
          user: updatedUser,
        });
      }
    } catch (e) {
      console.error('Auth hydration failed:', e);
      set({ isLoggedIn: false, accessToken: null, user: null });
    }
  },
}));