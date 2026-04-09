import type { TooltipRootProps } from '@chakra-ui/react';

export interface TooltipProps extends TooltipRootProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  hasArrow?: boolean;
  defaultOpen?: TooltipRootProps['defaultOpen'];
  disabled?: TooltipRootProps['disabled'];
  closeDelay?: TooltipRootProps['closeDelay'];
  openDelay?: TooltipRootProps['openDelay'];
  closeOnClick?: TooltipRootProps['closeOnClick'];
  closeOnEscape?: TooltipRootProps['closeOnEscape'];
  closeOnPointerDown?: TooltipRootProps['closeOnPointerDown'];
  closeOnScroll?: TooltipRootProps['closeOnScroll'];
  interactive?: TooltipRootProps['interactive'];
  lazyMount?: TooltipRootProps['lazyMount'];
  unmountOnExit?: TooltipRootProps['unmountOnExit'];
}

export const TooltipDefaultProps: TooltipProps = {
  hasArrow: false,
  defaultOpen: false,
  disabled: false,
  closeDelay: 250,
  openDelay: 500,
  closeOnClick: true,
  closeOnEscape: true,
  closeOnPointerDown: true,
  closeOnScroll: true,
  interactive: false,
  lazyMount: false,
  unmountOnExit: false,
};
