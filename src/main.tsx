// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import { useAuthStore } from './stores/useAuthStore';
import { setAccessToken } from './utils/axios.ts';

// (새로 추가) React Query 1, 2
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// (새로 추가) React Query 3
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
    {/* (새로 추가) React Query 4: <App />을 Provider로 감싸기 */}
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="975990232206-j0fe83p1205hcnl2e6r983aq94ib0q3n.apps.googleusercontent.com">
        <HashRouter>
          <App />
        </HashRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);