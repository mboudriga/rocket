import type { MenuRootProps } from '@chakra-ui/react';

export interface ContextMenuItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
}

export interface ContextMenuProps extends Omit<MenuRootProps, 'children'> {
  trigger?: React.ReactNode;
  items?: Array<ContextMenuItem>;
  size?: 'sm' | 'md';
}

export const ContextMenuDefaultProps: Partial<ContextMenuProps> = {
  size: 'md',
};
