import type { ColorPalette, ProgressCircleRootProps } from '@chakra-ui/react';

export interface ProgressCircleProps extends ProgressCircleRootProps {
  colorPalette?: ColorPalette;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ProgressCircleDefaultProps: ProgressCircleProps = {
  colorPalette: 'blue',
  size: 'md',
};
