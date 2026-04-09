import { Code as ChakraCode } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';

import { CodeDefaultProps, type CodeProps } from './Code.types';

const Code = ({
  ref,
  variant = CodeDefaultProps.variant,
  colorPalette = CodeDefaultProps.colorPalette,
  ...props
}: CodeProps & {
  ref?: React.Ref<HTMLElement>;
}) => {
  const CodeStyles: StyleProps = variant === 'outline' ? { background: 'bg' } : {};

  return <ChakraCode ref={ref} variant={variant} colorPalette={colorPalette} {...CodeStyles} {...props} />;
};

export { Code };
