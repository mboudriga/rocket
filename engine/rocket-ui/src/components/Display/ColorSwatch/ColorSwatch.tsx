import { ColorSwatch as ChakraColorSwatch } from '@chakra-ui/react';

import type { ColorSwatchProps } from './ColorSwatch.types';

const ColorSwatch = ({
  ref,
  ...props
}: ColorSwatchProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraColorSwatch ref={ref} {...props} />;
};

export { ColorSwatch };
