// src/components/common/RouteChangeTracker.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // GA 초기화 여부 확인
  useEffect(() => {
    if (ReactGA.isInitialized) {
      setInitialized(true);
    }
  }, []);

  // location이 변경될 때마다 페이지뷰 전송
  useEffect(() => {
    if (initialized) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
        title: document.title // 현재 페이지 title함께 
      });
    }
  }, [initialized, location]);

  return null; 
};

export default RouteChangeTracker;