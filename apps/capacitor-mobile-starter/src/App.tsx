import { Navigate, Route, Routes } from 'react-router-dom';
import { BackButtonHandler } from '@/components/BackButtonHandler';
import { MobileLayout } from '@/components/MobileLayout';
import { Camera } from '@/routes/Camera';
import { Haptics } from '@/routes/Haptics';
import { Home } from '@/routes/Home';
import { Location } from '@/routes/Location';
import { Settings } from '@/routes/Settings';
import { Storage } from '@/routes/Storage';

export function App() {
  return (
    <MobileLayout>
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/location" element={<Location />} />
        <Route path="/haptics" element={<Haptics />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MobileLayout>
  );
}
