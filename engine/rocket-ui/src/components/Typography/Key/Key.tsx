import { Kbd } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';

import { KeyDefaultProps, type KeyProps } from './Key.types';

const Key = ({
  ref,
  variant = KeyDefaultProps.variant,
  colorPalette = KeyDefaultProps.colorPalette,
  ...props
}: KeyProps & {
  ref?: React.Ref<HTMLSpanElement>;
}) => {
  const KeyStyles: StyleProps = variant === 'outline' ? { background: 'bg', color: 'fg' } : { color: 'fg' };

  return <Kbd ref={ref} variant={variant} colorPalette={colorPalette} {...KeyStyles} {...props} />;
};

export { Key };
