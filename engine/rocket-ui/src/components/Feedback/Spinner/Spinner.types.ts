import type { SpinnerProps as ChakraSpinnerProps } from '@chakra-ui/react';

export interface SpinnerProps extends ChakraSpinnerProps {
  size?: 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const SpinnerDefaultProps: SpinnerProps = {
  size: 'lg',
};
