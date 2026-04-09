import type { IconButtonProps as ChakraIconButtonProps, ColorPalette } from '@chakra-ui/react';

export interface IconButtonProps extends ChakraIconButtonProps {
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const IconButtonDefaultProps: Partial<IconButtonProps> = {
  colorPalette: 'gray',
  variant: 'ghost',
  size: 'md',
};
