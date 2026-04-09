import type { DialogBodyProps, DialogRootProps } from '@chakra-ui/react';
import type { ButtonProps } from '@components/Form/Button';

export interface DialogProps extends DialogRootProps {
  title?: string;
  buttons?: Array<ButtonProps>;
  bodyProps?: DialogBodyProps;
  open?: DialogRootProps['open'];
  placement?: 'center' | 'top' | 'bottom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full';
  scrollBehavior?: 'inside' | 'outside';
  motionPreset?:
    | 'scale'
    | 'slide-in-bottom'
    | 'slide-in-top'
    | 'slide-in-left'
    | 'slide-in-right'
    | 'none';
  closeOnEscape?: DialogRootProps['closeOnEscape'];
  closeOnInteractOutside?: DialogRootProps['closeOnInteractOutside'];
  lazyMount?: DialogRootProps['lazyMount'];
  preventScroll?: DialogRootProps['preventScroll'];
  trapFocus?: DialogRootProps['trapFocus'];
  onClose?: () => void;
  onOpenChange?: (details: { open: boolean }) => void;
}

export const DialogDefaultProps: DialogProps = {
  children: null,
  placement: 'top',
  size: 'md',
  scrollBehavior: 'outside',
  motionPreset: 'scale',
  closeOnEscape: false,
  closeOnInteractOutside: false,
  lazyMount: false,
  preventScroll: true,
  trapFocus: true,
};
