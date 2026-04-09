import { Box, Flex, Heading } from '@rocket/ui';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { LuMoon, LuRocket, LuSun } from 'react-icons/lu';

export function AppHeader() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setColorMode(isDark ? 'dark' : 'light');
  }, []);

  const toggleColorMode = () => {
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  return (
    <Box
      as="header"
      flexShrink={0}
      height="60px"
      bg="bg.panel"
      borderBottom="1px solid"
      borderColor="border"
      px="4"
    >
      <Flex height="100%" align="center" justify="space-between">
        <Link to="/">
          <Flex align="center" gap="2">
            <Flex
              align="center"
              justify="center"
              width="36px"
              height="36px"
              borderRadius="lg"
              bg="blue.solid"
              color="blue.contrast"
            >
              <LuRocket size={20} />
            </Flex>
            <Heading size="md" display={{ base: 'none', tablet: 'block' }}>
              TanStack Start Starter
            </Heading>
          </Flex>
        </Link>

        <Box
          as="button"
          onClick={toggleColorMode}
          p="2"
          borderRadius="md"
          bg="bg.subtle"
          _hover={{ bg: 'bg.muted' }}
          transition="background-color 0.2s"
          cursor="pointer"
        >
          {colorMode === 'light' ? <LuMoon size={18} /> : <LuSun size={18} />}
        </Box>
      </Flex>
    </Box>
  );
}
