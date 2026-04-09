import { Link, NavLink, Outlet, useNavigation } from 'react-router';
import { Box, Flex, Heading, Image, Text } from '@rocket/ui';
import { LuLayoutDashboard, LuList, LuPlus, LuSettings } from 'react-icons/lu';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LuLayoutDashboard, end: true },
  { to: '/dashboard/items', label: 'Items', icon: LuList },
  { to: '/dashboard/items/new', label: 'New Item', icon: LuPlus },
  { to: '/dashboard/settings', label: 'Settings', icon: LuSettings },
];

export default function DashboardLayout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';

  return (
    <Flex minH="100vh">
      <Flex.V
        as="nav"
        w="240px"
        bg="bg.muted"
        p="4"
        gap="1"
        borderRightWidth="1px"
        borderColor="border"
        flexShrink={0}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Flex.H align="center" gap="3" px="3" mb="4" _hover={{ opacity: 0.8 }} transition="opacity 0.15s">
            <Image src="/favicon.svg" alt="Rocket logo" h="28px" flexShrink={0} />
            <Heading size="md">Dashboard</Heading>
          </Flex.H>
        </Link>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {({ isActive }) => (
              <Flex.H
                align="center"
                gap="3"
                px="3"
                py="2"
                borderRadius="md"
                bg={isActive ? 'bg.subtle' : 'transparent'}
                color={isActive ? 'fg' : 'fg.muted'}
                fontWeight={isActive ? 'semibold' : 'normal'}
                _hover={{ bg: 'bg.subtle' }}
                transition="background 0.15s"
              >
                <item.icon />
                <Text fontSize="sm">{item.label}</Text>
              </Flex.H>
            )}
          </NavLink>
        ))}
      </Flex.V>

      <Box flex="1" p="6" opacity={isNavigating ? 0.7 : 1} transition="opacity 0.2s">
        <Outlet />
      </Box>
    </Flex>
  );
}
