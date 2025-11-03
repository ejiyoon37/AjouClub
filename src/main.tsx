// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import { useAuthStore } from './stores/useAuthStore';
import { setAccessToken } from './utils/axios.ts';

// React Query 1, 2
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query 3
const queryClient = new QueryClient();

const restoreAuthState = () => {
  const raw = localStorage.getItem('auth');
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.accessToken && parsed.user) {
      useAuthStore.getState().setAuth({
        isLoggedIn: true,
        accessToken: parsed.accessToken,
        user: parsed.user,
      });
      setAccessToken(parsed.accessToken);
    }
  } catch (e) {
    console.error('auth 복원 실패:', e);
    localStorage.removeItem('auth');
  }
};

restoreAuthState();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* React Query 4: <App />을 Provider로 감싸 */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="67500785353-oq4u26r3uek1s7b569sfr52sjkvj7j36.apps.googleusercontent.com">
        <HashRouter>
          <App />
        </HashRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);