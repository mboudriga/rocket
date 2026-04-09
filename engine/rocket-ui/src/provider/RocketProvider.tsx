import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import type { ToastContainerProps } from 'react-toastify';

import { ROCKET_THEME } from '../theme';
import { ToastProvider } from '../toast/ToastProvider';

export interface RocketProviderProps {
  children: ReactNode;
  /** Custom theme system. Defaults to ROCKET_THEME. */
  theme?: Parameters<typeof ChakraProvider>[0]['value'];
  /** Toast configuration overrides. Pass `false` to disable toasts. */
  toast?: Partial<ToastContainerProps> | false;
}

export function RocketProvider({ children, theme = ROCKET_THEME, toast }: RocketProviderProps) {
  return (
    <ChakraProvider value={theme}>
      {toast === false ? children : <ToastProvider {...(toast || {})}>{children}</ToastProvider>}
    </ChakraProvider>
  );
}
