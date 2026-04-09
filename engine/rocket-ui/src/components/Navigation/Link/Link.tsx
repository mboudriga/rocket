import { Link as ChakraLink, LinkBox } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';

import type { LinkProps } from './Link.types';

const Link = ({
  ref,
  children,
  ...props
}: LinkProps & {
  ref?: React.Ref<HTMLAnchorElement>;
}) => {
  return (
    <ChakraLink ref={ref} {...LinkStyles} {...props}>
      {children}
    </ChakraLink>
  );
};

const LinkStyles: StyleProps = {
  color: 'blue.fg',
  textDecoration: 'underline',
  _hover: {
    color: 'blue.fg',
  },
};

const LinkNotation = Object.assign(Link, { Box: LinkBox });

export { LinkNotation as Link };
