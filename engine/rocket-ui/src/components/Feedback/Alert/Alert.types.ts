import type { AlertRootProps } from '@chakra-ui/react';

export const AlertStatus = Object.freeze({
  NEUTRAl: 'neutral',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
});

export interface AlertProps extends AlertRootProps {
  /** Emphasized text which prefixes the message */
  title?: string;
  status?: 'info' | 'warning' | 'success' | 'error' | 'neutral';
  variant?: 'subtle' | 'surface' | 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  /** Passing a function will make the close button appear; clicking the button will call
   * the passed function */
  onClose?: () => void;
}

export const AlertDefaultProps: AlertProps = {
  status: 'info',
  variant: 'surface',
  size: 'md',
};
