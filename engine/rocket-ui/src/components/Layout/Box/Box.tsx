import { Box as ChakraBox } from '@chakra-ui/react';

import type { BoxProps } from './Box.types';

const Box = ({
  ref,
  ...props
}: BoxProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraBox ref={ref} {...props} />;
};

export { Box };
