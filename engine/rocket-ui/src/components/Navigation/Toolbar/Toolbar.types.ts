import type { HTMLChakraProps } from '@chakra-ui/react';

export interface ToolbarProps extends Omit<HTMLChakraProps<'div'>, 'role' | 'direction'> {
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ToolbarButtonProps extends Omit<HTMLChakraProps<'button'>, 'size'> {
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ToolbarToggleGroupProps {
  type?: 'single' | 'multiple';
  value?: string | Array<string>;
  defaultValue?: string | Array<string>;
  onValueChange?: (value: string | Array<string>) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export interface ToolbarToggleItemProps extends Omit<HTMLChakraProps<'button'>, 'size'> {
  value: string;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ToolbarSeparatorProps extends HTMLChakraProps<'div'> {
  orientation?: 'horizontal' | 'vertical';
}

export interface ToolbarLinkProps extends Omit<HTMLChakraProps<'a'>, 'size'> {
  icon?: React.ReactNode;
  label?: string;
  href: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ToolbarDefaultProps: Partial<ToolbarProps> = {
  orientation: 'horizontal',
  loop: true,
  size: 'md',
};
