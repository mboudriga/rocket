import type { ClipboardRootProps } from '@chakra-ui/react';

export interface ClipboardProps extends Omit<ClipboardRootProps, 'value'> {
  value: string;
  children?: React.ReactNode;
  timeout?: number;
}

export const ClipboardDefaultProps: Partial<ClipboardProps> = {
  timeout: 2000,
};
