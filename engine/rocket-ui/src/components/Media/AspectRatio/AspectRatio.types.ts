import type { AspectRatioProps as ChakraAspectRatioProps } from '@chakra-ui/react';

export interface AspectRatioProps extends ChakraAspectRatioProps {
  ratio?: ChakraAspectRatioProps['ratio'];
  maxWidth?: ChakraAspectRatioProps['maxWidth'];
}

export const AspectRatioDefaultProps: AspectRatioProps = {
  ratio: 4 / 3,
};
