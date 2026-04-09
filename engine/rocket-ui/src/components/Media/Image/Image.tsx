import { Image as ChakraImage } from '@chakra-ui/react';

import type { ImageProps } from './Image.types';

const Image = ({
  ref,
  ...props
}: ImageProps & {
  ref?: React.Ref<HTMLImageElement>;
}) => {
  return <ChakraImage ref={ref} {...props} />;
};

export { Image };
