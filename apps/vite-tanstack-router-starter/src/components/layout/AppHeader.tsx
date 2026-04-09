import { Avatar, Box, Button, Flex, Heading, Text } from '@rocket/ui';
import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { LuLogOut, LuMoon, LuRocket, LuSun } from 'react-icons/lu';

import { useAuth } from '@/features/auth';

export function AppHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    await logout();
    await navigate({ to: '/' });
  };

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height="60px"
      bg={{ base: 'white', _dark: 'gray.900' }}
      borderBottom="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      zIndex="sticky"
      px="4"
    >
      <Flex height="100%" align="center" justify="space-between" maxWidth="1800px" mx="auto">
        <Link to="/">
          <Flex align="center" gap="2">
            <Flex
              align="center"
              justify="center"
              width="36px"
              height="36px"
              borderRadius="lg"
              bg="blue.500"
              color="white"
            >
              <LuRocket size={20} />
            </Flex>
            <Heading size="md" display={{ base: 'none', sm: 'block' }}>
              Rocket App
            </Heading>
          </Flex>
        </Link>

        <Flex align="center" gap="3">
          <Box
            as="button"
            onClick={toggleColorMode}
            p="2"
            borderRadius="md"
            bg={{ base: 'gray.100', _dark: 'gray.800' }}
            _hover={{ bg: { base: 'gray.200', _dark: 'gray.700' } }}
            transition="background-color 0.2s"
          >
            {colorMode === 'light' ? <LuMoon size={18} /> : <LuSun size={18} />}
          </Box>

          {isAuthenticated ? (
            <Flex align="center" gap="3">
              <Flex align="center" gap="2" display={{ base: 'none', md: 'flex' }}>
                <Avatar name={user?.name} size="sm" />
                <Text fontSize="sm" fontWeight="medium">
                  {user?.name}
                </Text>
              </Flex>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LuLogOut /> Sign Out
              </Button>
            </Flex>
          ) : (
            <Link to="/login">
              <Button colorPalette="blue" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
