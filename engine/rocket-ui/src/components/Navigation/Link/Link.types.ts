import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export interface LinkProps extends ChakraLinkProps {
  variant?: 'underline' | 'plain';
}

export const LinkDefaultProps: LinkProps = { variant: 'plain' };
