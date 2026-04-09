import { Flex as ChakraFlex } from '@chakra-ui/react';

import type { FlexProps } from './Flex.types';

const HFlex = ({
  ref,
  ...props
}: FlexProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraFlex ref={ref} direction="row" {...props} />;
};

export { HFlex };
