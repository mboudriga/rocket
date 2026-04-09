import { Flex as ChakraFlex } from '@chakra-ui/react';

import type { FlexProps } from './Flex.types';
import { HFlex } from './HFlex';
import { VFlex } from './VFlex';

const Flex = ({
  ref,
  ...props
}: FlexProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraFlex ref={ref} {...props} />;
};

const FlexNotation = Object.assign(Flex, { V: VFlex, H: HFlex });

export { FlexNotation as Flex };
