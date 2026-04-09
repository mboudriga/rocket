import { App as CapApp } from '@capacitor/app';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);
  pathnameRef.current = location.pathname;

  useEffect(() => {
    const listener = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack || pathnameRef.current === '/') {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, [navigate]);

  return null;
}
