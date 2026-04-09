import { Wrap as ChakraWrap } from '@chakra-ui/react';

import type { WrapProps } from './Wrap.types';

const Wrap = ({
  ref,
  ...props
}: WrapProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraWrap ref={ref} {...props} />;
};

export { Wrap };
