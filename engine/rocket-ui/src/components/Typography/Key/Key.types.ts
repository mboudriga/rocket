import type { ColorPalette, KbdProps } from '@chakra-ui/react';

export interface KeyProps extends KbdProps {
  colorPalette?: ColorPalette;
  variant?: 'raised' | 'outline' | 'subtle' | 'plain';
  size?: 'sm' | 'md' | 'lg';
}

export const KeyDefaultProps: KeyProps = {
  colorPalette: 'gray',
  variant: 'raised',
  size: 'md',
};
