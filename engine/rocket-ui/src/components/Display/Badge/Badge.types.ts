import type { BadgeProps as ChakraBadgeProps, ColorPalette } from '@chakra-ui/react';

export interface BadgeProps extends ChakraBadgeProps {
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'subtle' | 'outline' | 'surface' | 'plain';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const BadgeDefaultProps: BadgeProps = {
  colorPalette: 'blue',
  variant: 'subtle',
  size: 'md',
};
