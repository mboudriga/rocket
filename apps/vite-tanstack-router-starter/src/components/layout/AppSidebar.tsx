import { Box, Flex, Text } from '@rocket/ui';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { LuBox, LuHouse, LuLayoutDashboard, LuSettings } from 'react-icons/lu';

import { useAuth } from '@/features/auth';

export function AppSidebar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      as="nav"
      position="fixed"
      top="60px"
      left="0"
      bottom="0"
      width="240px"
      bg={{ base: 'white', _dark: 'gray.900' }}
      borderRight="1px solid"
      borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
      overflowY="auto"
      display={{ base: 'none', md: 'block' }}
      px="3"
      py="4"
    >
      <Flex.V gap="1">
        <NavLink to="/" icon={<LuHouse size={18} />}>
          Home
        </NavLink>
        <NavLink to="/dashboard" icon={<LuLayoutDashboard size={18} />}>
          Dashboard
        </NavLink>
        <NavLink to="/items" icon={<LuBox size={18} />}>
          Items
        </NavLink>
        <NavLink to="/settings" icon={<LuSettings size={18} />}>
          Settings
        </NavLink>
      </Flex.V>
    </Box>
  );
}

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function NavLink({ to, icon, children }: NavLinkProps) {
  const matchRoute = useMatchRoute();
  const isActive = to === '/' ? matchRoute({ to, fuzzy: false }) : matchRoute({ to, fuzzy: true });

  return (
    <Link to={to}>
      <Flex
        align="center"
        gap="3"
        py="2"
        px="3"
        borderRadius="md"
        bg={isActive ? { base: 'blue.50', _dark: 'blue.900/30' } : 'transparent'}
        color={isActive ? { base: 'blue.700', _dark: 'blue.300' } : 'inherit'}
        _hover={{ bg: { base: 'gray.100', _dark: 'gray.800' } }}
        transition="all 0.15s"
      >
        {icon}
        <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
}
