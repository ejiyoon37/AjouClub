// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface UserInfo {
  id: number;
  email: string;
  name: string;
  profilePic: string | null; // (수정) MyInfoResponse 스키마와 일치
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: UserInfo | null;
  setAuth: (auth: { isLoggedIn: boolean; accessToken: string | null; user: UserInfo | null }) => void;
  logout: () => void;
  rehydrateAuth: () => void; // (수정) hydration 실행
}

const STORAGE_KEY = 'auth'; // (수정) localStorage 키

export const useAuthStore = create<AuthState>((set) => ({
  // (수정) 👉 로그인 강제 활성화 제거 (기본값으로 변경)
  isLoggedIn: false,
  accessToken: null,
  user: null,

  setAuth: ({ isLoggedIn, accessToken, user }) => {
    set({ isLoggedIn, accessToken, user });

    // (수정) 👉 실제 로컬스토리지 저장 코드 활성화
    if (accessToken && user) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accessToken, user })
      );
    } else {
      // (추가) 로그아웃 시 localStorage도 제거
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  logout: () => {
    // (수정) 👉 실제 로그아웃 로직 활성화
    localStorage.removeItem(STORAGE_KEY);
    set({ isLoggedIn: false, accessToken: null, user: null });
    console.log('[Auth] 로그아웃됨');
  },

  rehydrateAuth: () => {
    // (수정) 👉 hydration 로직 활성화
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (parsed.accessToken && parsed.user) {
        set({
          isLoggedIn: true,
          accessToken: parsed.accessToken,
          user: parsed.user,
        });
      } else {
        set({ isLoggedIn: false, accessToken: null, user: null });
      }
    } catch (e) {
      console.error('Auth hydration failed:', e);
      set({ isLoggedIn: false, accessToken: null, user: null });
    }
  },
}));