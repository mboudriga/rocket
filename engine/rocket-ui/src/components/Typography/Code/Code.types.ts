import type { CodeProps as ChakraCodeProps, ColorPalette } from '@chakra-ui/react';

export interface CodeProps extends ChakraCodeProps {
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'subtle' | 'outline' | 'surface' | 'plain';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const CodeDefaultProps: CodeProps = {
  colorPalette: 'gray',
  variant: 'subtle',
  size: 'sm',
};
