import { Center as ChakraCenter } from '@chakra-ui/react';

import type { CenterProps } from './Center.types';

const Center = ({
  ref,
  ...props
}: CenterProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraCenter ref={ref} {...props} />;
};

export { Center };
