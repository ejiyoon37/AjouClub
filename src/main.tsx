import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import { useAuthStore } from './stores/useAuthStore';
import { setAccessToken } from './utils/axios.ts';

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
    <GoogleOAuthProvider clientId="975990232206-j0fe83p1205hcnl2e6r983aq94ib0q3n.apps.googleusercontent.com">
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);