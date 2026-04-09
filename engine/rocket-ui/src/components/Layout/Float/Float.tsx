import { Float as ChakraFloat } from '@chakra-ui/react';

import type { FloatProps } from './Float.types';

const centerFix: Partial<Record<NonNullable<FloatProps['placement']>, Record<string, string>>> = {
  'top-center': { insetEnd: 'auto' },
  'bottom-center': { insetEnd: 'auto' },
  'middle-center': { insetEnd: 'auto', insetBlockEnd: 'auto' },
};

const Float = ({
  ref,
  placement = 'top-end',
  ...props
}: FloatProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <ChakraFloat ref={ref} placement={placement} {...centerFix[placement]} {...props} />;
};

export { Float };
