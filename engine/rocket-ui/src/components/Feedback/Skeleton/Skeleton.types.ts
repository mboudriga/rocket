import type { SkeletonProps as ChakraSkeletonProps } from '@chakra-ui/react';

export interface SkeletonProps extends ChakraSkeletonProps {
  loading?: ChakraSkeletonProps['loading'];
  variant?: 'pulse' | 'shine' | 'none';
}

export const SkeletonDefaultProps: SkeletonProps = { loading: true, variant: 'pulse' };
