import { Portal as ChakraPortal } from '@chakra-ui/react';
import { Box } from '@components/Layout/Box';

import type { PortalProps } from './Portal.types';

const Portal = ({
  ref,
  children,
  ...props
}: PortalProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <ChakraPortal {...props}>
      <Box ref={ref}>{children}</Box>
    </ChakraPortal>
  );
};

export { Portal };
