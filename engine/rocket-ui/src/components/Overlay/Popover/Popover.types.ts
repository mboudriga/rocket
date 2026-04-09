import type { PopoverRootProps } from '@chakra-ui/react';

export interface PopoverProps extends Omit<PopoverRootProps, 'children'> {
  trigger?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  hasArrow?: boolean;
  hasCloseButton?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const PopoverDefaultProps: PopoverProps = {
  hasArrow: true,
  hasCloseButton: true,
  size: 'md',
  closeOnInteractOutside: true,
  lazyMount: false,
  unmountOnExit: false,
};
