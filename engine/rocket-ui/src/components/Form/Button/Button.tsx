import { Button as ChakraButton } from '@chakra-ui/react';

import type { StyleProps } from '../../../types';
import { ButtonDefaultProps, type ButtonProps } from './Button.types';

const Button = ({
  ref,
  variant = ButtonDefaultProps.variant,
  colorPalette = ButtonDefaultProps.colorPalette,
  ...props
}: ButtonProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const ButtonStyles: StyleProps = variant === 'outline' ? { bg: 'bg' } : {};

  return <ChakraButton ref={ref} variant={variant} colorPalette={colorPalette} {...ButtonStyles} {...props} />;
};

export { Button };
