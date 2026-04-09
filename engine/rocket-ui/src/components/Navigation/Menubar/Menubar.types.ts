import type { HTMLChakraProps } from '@chakra-ui/react';

export interface MenubarMenuItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
}

export interface MenubarMenu {
  label: string;
  items: Array<MenubarMenuItem>;
}

export interface MenubarProps extends Omit<HTMLChakraProps<'div'>, 'children' | 'direction'> {
  menus: Array<MenubarMenu>;
  loop?: boolean;
  size?: 'sm' | 'md';
}

export const MenubarDefaultProps: Partial<MenubarProps> = {
  loop: false,
  size: 'md',
};
