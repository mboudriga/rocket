import { Icon as ChakraIcon } from '@chakra-ui/react';

import type { IconProps } from './Icon.types';

const Icon = ({
  ref,
  ...props
}: IconProps & {
  ref?: React.Ref<SVGSVGElement>;
}) => {
  return <ChakraIcon ref={ref} alignSelf="center" {...props} />;
};

export { Icon };
