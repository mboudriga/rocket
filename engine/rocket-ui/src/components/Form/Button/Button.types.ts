import type { ButtonProps as ChakraButtonProps, ColorPalette } from '@chakra-ui/react';

export interface ButtonProps extends ChakraButtonProps {
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  loading?: ChakraButtonProps['loading'];
  loadingText?: ChakraButtonProps['loadingText'];
  onClick?: ChakraButtonProps['onClick'];
}

export const ButtonDefaultProps: ButtonProps = {
  colorPalette: 'blue',
  variant: 'solid',
  size: 'md',
  loading: false,
  loadingText: '',
};
