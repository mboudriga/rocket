import { SimpleGrid } from '@chakra-ui/react';

import type { GridProps } from './Grid.types';

const Grid = ({
  ref,
  ...props
}: GridProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <SimpleGrid ref={ref} {...props} />;
};

export { Grid };
