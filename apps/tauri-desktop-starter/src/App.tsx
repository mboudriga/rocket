import { Box, Flex } from '@rocket/ui';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Titlebar } from '@/components/Titlebar';
import { About } from '@/pages/About';
import { Files } from '@/pages/Files';
import { Home } from '@/pages/Home';
import { Notes } from '@/pages/Notes';
import { Settings } from '@/pages/Settings';

export function App() {
  return (
    <Flex.V height="100vh" bg="bg">
      <Titlebar />
      <Flex.H flex="1" overflow="hidden">
        <Sidebar />
        <Box as="main" flex="1" overflow="auto" p="6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/files" element={<Files />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Flex.H>
    </Flex.V>
  );
}
