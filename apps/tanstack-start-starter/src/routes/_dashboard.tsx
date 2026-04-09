import { Box, Flex } from '@rocket/ui';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <Flex.V height="100dvh" bg="bg">
      <AppHeader />
      <Flex flex="1" overflow="hidden">
        <AppSidebar />
        <Box as="main" flex="1" overflowY="auto" ml={{ base: '0', tablet: '240px' }}>
          <Box maxWidth="1200px" mx="auto" px={{ base: '4', desktop: '8' }} py="6">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex.V>
  );
}
