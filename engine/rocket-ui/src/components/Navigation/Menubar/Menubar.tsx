import { Box, Button, Menu as ChakraMenu, Kbd, Portal } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import { createContext, useCallback, useContext, useState } from 'react';

import type { MenubarMenu, MenubarProps } from './Menubar.types';

// Context for managing menubar state
interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  isAnyOpen: boolean;
}

const MenubarContext = createContext<MenubarContextValue>({
  activeMenu: null,
  setActiveMenu: () => {
    /* no-op */
  },
  isAnyOpen: false,
});

// Individual menu within menubar
interface MenubarMenuItemProps {
  menu: MenubarMenu;
  index: number;
  size: 'sm' | 'md';
}

const MenubarMenuItem = ({ menu, index, size }: MenubarMenuItemProps) => {
  const { activeMenu, setActiveMenu, isAnyOpen } = useContext(MenubarContext);
  const menuId = `menu-${index}`;
  const isOpen = activeMenu === menuId;

  const handleOpenChange = useCallback(
    (details: { open: boolean }) => {
      if (details.open) {
        setActiveMenu(menuId);
      } else if (activeMenu === menuId) {
        setActiveMenu(null);
      }
    },
    [activeMenu, menuId, setActiveMenu]
  );

  const handleMouseEnter = useCallback(() => {
    if (isAnyOpen && activeMenu !== menuId) {
      setActiveMenu(menuId);
    }
  }, [isAnyOpen, activeMenu, menuId, setActiveMenu]);

  const buttonSize = size === 'sm' ? 'xs' : 'sm';

  return (
    <ChakraMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
      <ChakraMenu.Trigger asChild>
        {/* role="menuitem" added to satisfy ARIA menubar containment requirement.
            This creates a semantic overlap (button + menuitem) but resolves the a11y violation. */}
        <Button
          role="menuitem"
          variant={isOpen ? 'subtle' : 'ghost'}
          size={buttonSize}
          fontWeight="normal"
          borderRadius="sm"
          onMouseEnter={handleMouseEnter}
        >
          {menu.label}
        </Button>
      </ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content minWidth="180px">
            {menu.items.map((item) => (
              <ChakraMenu.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setActiveMenu(null);
                }}
              >
                {item.icon}
                <Box flex="1">{item.label}</Box>
                {item.shortcut && (
                  <Kbd size="sm" variant="subtle">
                    {item.shortcut}
                  </Kbd>
                )}
              </ChakraMenu.Item>
            ))}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};

const Menubar = ({
  ref,
  menus,
  size = 'md',
  ...props
}: MenubarProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isAnyOpen = activeMenu !== null;

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu, isAnyOpen }}>
      <Flex.H
        ref={ref}
        role="menubar"
        gap={1}
        padding={1}
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        bg="bg.panel"
        {...props}
      >
        {menus.map((menu, index) => (
          <MenubarMenuItem key={index} menu={menu} index={index} size={size} />
        ))}
      </Flex.H>
    </MenubarContext.Provider>
  );
};

export { Menubar };
