// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface UserInfo {
  id: number;
  email: string;
  name: string;
}

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
  // 👉 로그인 강제 활성화
  isLoggedIn: true,
  accessToken: 'mock-access-token',
  user: {
    id: 1,
    email: 'mockuser@ajou.ac.kr',
    name: '김아주',
  },

  setAuth: ({ isLoggedIn, accessToken, user }) => {
    set({ isLoggedIn, accessToken, user });

    // 원래 로컬스토리지 저장 코드
    // if (accessToken && user) {
    //   localStorage.setItem(
    //     STORAGE_KEY,
    //     JSON.stringify({ accessToken, user })
    //   );
    // }
  },

  logout: () => {
    // localStorage.removeItem(STORAGE_KEY);
    // set({ isLoggedIn: false, accessToken: null, user: null });

    // 👉 로그아웃 무시
    console.log('[mock] logout 호출됨 - 실제 로그아웃은 하지 않음');
  },

  rehydrateAuth: () => {
    // try {
    //   const stored = localStorage.getItem(STORAGE_KEY);
    //   if (!stored) return;

    //   const parsed = JSON.parse(stored);
    //   if (parsed.accessToken && parsed.user) {
    //     set({
    //       isLoggedIn: true,
    //       accessToken: parsed.accessToken,
    //       user: parsed.user,
    //     });
    //   } else {
    //     set({ isLoggedIn: false, accessToken: null, user: null });
    //   }
    // } catch (e) {
    //   console.error('Auth hydration failed:', e);
    //   set({ isLoggedIn: false, accessToken: null, user: null });
    // }

    // 👉 hydration도 무시
    console.log('[mock] rehydrateAuth 실행됨 - 무시');
  },
}));