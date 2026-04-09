import { Box, Flex, IconButton, Text } from '@rocket/ui';
import {
  LuFile,
  LuHouse,
  LuInfo,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuSettings,
  LuStickyNote,
} from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/stores/app-store';

const navItems = [
  { to: '/', label: 'Home', icon: LuHouse },
  { to: '/files', label: 'Files', icon: LuFile },
  { to: '/notes', label: 'Notes', icon: LuStickyNote },
  { to: '/settings', label: 'Settings', icon: LuSettings },
  { to: '/about', label: 'About', icon: LuInfo },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <Flex.V
      as="nav"
      width={sidebarOpen ? '220px' : '52px'}
      flexShrink={0}
      bg="bg.muted"
      borderRight="1px solid"
      borderColor="border"
      transition="width 0.2s"
      overflow="hidden"
    >
      <Flex.H justify={sidebarOpen ? 'flex-end' : 'center'} p="2">
        <IconButton
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <LuPanelLeftClose /> : <LuPanelLeftOpen />}
        </IconButton>
      </Flex.H>

      <Flex.V gap="1" px="2" flex="1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Flex.H
                align="center"
                gap="3"
                px="3"
                py="2"
                rounded="md"
                bg={isActive ? 'bg.subtle' : 'transparent'}
                color={isActive ? 'fg' : 'fg.muted'}
                _hover={{ bg: 'bg.subtle' }}
                transition="background 0.15s"
              >
                <Box flexShrink={0}>
                  <Icon size={18} />
                </Box>
                {sidebarOpen && (
                  <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'normal'} truncate>
                    {label}
                  </Text>
                )}
              </Flex.H>
            )}
          </NavLink>
        ))}
      </Flex.V>
    </Flex.V>
  );
}
