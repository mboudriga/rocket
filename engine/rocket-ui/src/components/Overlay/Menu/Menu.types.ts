import type { MenuRootProps } from '@chakra-ui/react';

export interface MenuItemProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenuProps extends Omit<MenuRootProps, 'children'> {
  trigger?: React.ReactNode;
  items?: Array<MenuItemProps>;
  size?: 'sm' | 'md';
}

export const MenuDefaultProps: Partial<MenuProps> = {
  size: 'md',
};
