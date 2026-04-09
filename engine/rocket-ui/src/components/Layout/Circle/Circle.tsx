import { Circle as ChakraCircle } from '@chakra-ui/react';

import type { CircleProps } from './Circle.types';

const Circle = ({
  ref,
  ...props
}: CircleProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraCircle ref={ref} {...props} />;
};

export { Circle };
