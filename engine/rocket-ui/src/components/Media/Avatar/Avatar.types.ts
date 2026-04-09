import type { AvatarRootProps, ColorPalette } from '@chakra-ui/react';

export interface AvatarProps extends AvatarRootProps {
  name?: string;
  src?: string;
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'subtle' | 'outline';
  shape?: 'square' | 'rounded' | 'full';
  size?: 'full' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const AvatarDefaultProps: AvatarProps = {
  colorPalette: 'gray',
  variant: 'subtle',
  shape: 'full',
  size: 'md',
};
