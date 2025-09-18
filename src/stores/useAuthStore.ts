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
  isLoggedIn: false,
  accessToken: null,
  user: null,

  setAuth: ({ isLoggedIn, accessToken, user }) => {
    set({ isLoggedIn, accessToken, user });

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

  rehydrateAuth: () => {
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
      }
    } catch (e) {
      console.error('Auth hydration failed:', e);
    }
  },
}));