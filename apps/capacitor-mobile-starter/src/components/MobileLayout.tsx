import { Box, Flex } from '@rocket/ui';
import { MobileNav } from '@/components/MobileNav';

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex.V height="100vh" bg="bg">
      <Box as="main" flex="1" overflow="auto" paddingTop="var(--safe-area-inset-top)" px="4" py="4">
        {children}
      </Box>
      <MobileNav />
    </Flex.V>
  );
}
