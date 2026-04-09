import type { ColorPalette, ProgressRootProps } from '@chakra-ui/react';

export interface ProgressProps extends ProgressRootProps {
  value?: ProgressRootProps['value'];
  min?: ProgressRootProps['min'];
  max?: ProgressRootProps['max'];
  colorPalette?: ColorPalette;
  variant?: 'outline' | 'subtle';
  shape?: 'square' | 'rounded' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ProgressDefaultProps: ProgressProps = {
  min: 0,
  max: 100,
  colorPalette: 'blue',
  variant: 'outline',
  shape: 'rounded',
  size: 'md',
};
