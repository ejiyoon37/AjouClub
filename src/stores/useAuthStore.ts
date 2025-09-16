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
}

// localStorage 키
const STORAGE_KEY = 'auth';

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,

  setAuth: ({ isLoggedIn, accessToken, user }) => {
    // 상태 설정
    set({ isLoggedIn, accessToken, user });

    // localStorage 저장
    if (accessToken && user) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accessToken, user })
      );
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ isLoggedIn: false, accessToken: null, user: null });
  },
}));