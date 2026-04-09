import type { CenterProps as ChakraCenterProps } from '@chakra-ui/react';

export interface CenterProps extends ChakraCenterProps {
  axis?: 'horizontal' | 'vertical' | 'both';
}

export const CenterDefaultProps: CenterProps = { axis: 'both' };
