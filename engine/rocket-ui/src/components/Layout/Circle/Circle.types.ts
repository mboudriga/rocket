import type { CircleProps as ChakraCircleProps } from '@chakra-ui/react';

export interface CircleProps extends ChakraCircleProps {
  size?: string | number;
}

export const CircleDefaultProps: CircleProps = {};
