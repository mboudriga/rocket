import { Box, Flex, Text } from '@rocket/ui';
import { LuCamera, LuDatabase, LuHouse, LuMapPin, LuSettings, LuVibrate } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: LuHouse },
  { to: '/camera', label: 'Camera', icon: LuCamera },
  { to: '/location', label: 'Location', icon: LuMapPin },
  { to: '/haptics', label: 'Haptics', icon: LuVibrate },
  { to: '/storage', label: 'Storage', icon: LuDatabase },
  { to: '/settings', label: 'Settings', icon: LuSettings },
];

export function MobileNav() {
  return (
    <Flex.H
      as="nav"
      flexShrink={0}
      bg="bg.muted"
      borderTop="1px solid"
      borderColor="border"
      paddingBottom="var(--safe-area-inset-bottom)"
    >
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} style={{ flex: 1, textDecoration: 'none' }}>
          {({ isActive }) => (
            <Flex.V
              align="center"
              gap="1"
              py="2"
              color={isActive ? 'colorPalette.fg' : 'fg.muted'}
              colorPalette="blue"
            >
              <Box>
                <Icon size={20} />
              </Box>
              <Text fontSize="2xs" fontWeight={isActive ? 'semibold' : 'normal'}>
                {label}
              </Text>
            </Flex.V>
          )}
        </NavLink>
      ))}
    </Flex.H>
  );
}
