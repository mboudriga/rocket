import { Heading as ChakraHeading, Highlight } from '@chakra-ui/react';

import type { HeadingProps } from './Heading.types';

// TODO: Replace highlight prop with query + highlightVariant
const Heading = ({
  ref,
  children,
  highlight,
  ...props
}: HeadingProps & {
  ref?: React.Ref<HTMLHeadingElement>;
}) => {
  return (
    <ChakraHeading ref={ref} {...props}>
      {highlight ? <Highlight {...highlight}>{`${children}`}</Highlight> : children}
    </ChakraHeading>
  );
};

export { Heading };
