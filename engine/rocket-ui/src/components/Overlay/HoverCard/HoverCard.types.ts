import type { HoverCardRootProps } from '@chakra-ui/react';

export interface HoverCardProps extends Omit<HoverCardRootProps, 'children'> {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  hasArrow?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const HoverCardDefaultProps: HoverCardProps = {
  hasArrow: true,
  size: 'md',
};
