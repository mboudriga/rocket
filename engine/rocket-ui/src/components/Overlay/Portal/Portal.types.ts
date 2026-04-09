import type { PortalProps as ChakraPortalProps } from '@chakra-ui/react';

export interface PortalProps extends ChakraPortalProps {
  children?: React.ReactNode;
}

export const PortalDefaultProps: PortalProps = {};
