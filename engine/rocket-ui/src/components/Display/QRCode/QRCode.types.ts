import type { QrCodeRootProps } from '@chakra-ui/react';

export interface QRCodeProps extends Omit<QrCodeRootProps, 'value' | 'size'> {
  value: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const QRCodeDefaultProps: Partial<QRCodeProps> = {
  size: 'md',
};
