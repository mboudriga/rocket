import { Box, Flex, Text } from '@rocket/ui';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { LuFileText, LuHouse, LuLayoutDashboard, LuSettings } from 'react-icons/lu';

const navItems = [
  { to: '/', icon: <LuHouse size={18} />, label: 'Home' },
  { to: '/dashboard', icon: <LuLayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/posts', icon: <LuFileText size={18} />, label: 'Posts' },
  { to: '/settings', icon: <LuSettings size={18} />, label: 'Settings' },
] as const;

export function AppSidebar() {
  return (
    <Box
      as="nav"
      position="fixed"
      top="60px"
      left="0"
      bottom="0"
      width="240px"
      bg="bg.panel"
      borderRight="1px solid"
      borderColor="border"
      overflowY="auto"
      display={{ base: 'none', tablet: 'block' }}
      px="3"
      py="4"
    >
      <Flex.V gap="1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} icon={item.icon}>
            {item.label}
          </NavLink>
        ))}
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
        bg={isActive ? 'blue.subtle' : 'transparent'}
        color={isActive ? 'blue.fg' : 'fg'}
        _hover={{ bg: 'bg.muted' }}
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
