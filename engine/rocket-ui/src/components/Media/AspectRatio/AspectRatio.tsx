import { AspectRatio as ChakraAspectRatio } from '@chakra-ui/react';

import type { AspectRatioProps } from './AspectRatio.types';

const AspectRatio = ({
  ref,
  ...props
}: AspectRatioProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraAspectRatio ref={ref} width="full" {...props} />;
};

export { AspectRatio };
