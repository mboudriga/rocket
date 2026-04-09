import type { ColorSwatchProps as ChakraColorSwatchProps } from '@chakra-ui/react';

export interface ColorSwatchProps extends Omit<ChakraColorSwatchProps, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const ColorSwatchDefaultProps: Partial<ColorSwatchProps> = {
  size: 'md',
};
