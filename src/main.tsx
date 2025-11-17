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

//Google Analytics
import ReactGA from 'react-ga4';

// React Query 3
const queryClient = new QueryClient();

const GA_MEASUREMENT_ID = "YOUR_GA_MEASUREMENT_ID"; // G-XXXXXXXXXX
 if (GA_MEASUREMENT_ID) {
   ReactGA.initialize(GA_MEASUREMENT_ID);
 }

// [수정됨] App.tsx와 동일한 스토어의 rehydrateAuth 함수를 사용하도록 변경
const restoreAuthState = () => {
  useAuthStore.getState().rehydrateAuth();
  // setAccessToken은 rehydrateAuth 내부에서 처리되지 않으므로,
  // rehydrateAuth가 실행된 *이후*의 상태에서 가져옵니다.
  const token = useAuthStore.getState().accessToken;
  if (token) {
    setAccessToken(token);
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