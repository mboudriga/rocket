import { Separator } from '@chakra-ui/react';

import type { DividerProps } from './Divider.types';

const Divider = ({
  ref,
  ...props
}: DividerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <Separator ref={ref} width="100%" {...props} />;
};

export { Divider };
