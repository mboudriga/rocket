import type { FloatProps as ChakraFloatProps } from '@chakra-ui/react';

export interface FloatProps extends ChakraFloatProps {
  placement?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end'
    | 'middle-start'
    | 'middle-center'
    | 'middle-end';
}

export const FloatDefaultProps: FloatProps = {};
