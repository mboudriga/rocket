import type { DrawerRootProps } from '@chakra-ui/react';
import type { ButtonProps } from '@components/Form/Button';

export interface DrawerProps extends DrawerRootProps {
  title?: string;
  buttons?: Array<ButtonProps>;
  placement?: 'start' | 'end' | 'top' | 'bottom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnInteractOutside?: boolean;
  onClose?: () => void;
}

export const DrawerDefaultProps: DrawerProps = {
  children: null,
  placement: 'end',
  size: 'md',
  closeOnInteractOutside: true,
};
