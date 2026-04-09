import { Flex as ChakraFlex } from '@chakra-ui/react';

import type { FlexProps } from './Flex.types';

const VFlex = ({
  ref,
  ...props
}: FlexProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraFlex ref={ref} direction="column" {...props} />;
};

export { VFlex };
