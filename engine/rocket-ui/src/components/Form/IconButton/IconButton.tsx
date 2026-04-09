import { IconButton as ChakraIconButton } from '@chakra-ui/react';

import { IconButtonDefaultProps, type IconButtonProps } from './IconButton.types';

const IconButton = ({
  ref,
  variant = IconButtonDefaultProps.variant,
  colorPalette = IconButtonDefaultProps.colorPalette,
  ...props
}: IconButtonProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  return (
    <ChakraIconButton
      ref={ref}
      variant={variant}
      colorPalette={colorPalette}
      {...(variant === 'outline' && { bg: { base: 'white', _dark: 'gray.800' } })}
      {...props}
    />
  );
};

export { IconButton };
