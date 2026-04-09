import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';

import { AvatarDefaultProps, type AvatarProps } from './Avatar.types';

const Avatar = ({
  ref,
  name,
  src,
  variant = AvatarDefaultProps.variant,
  colorPalette = AvatarDefaultProps.colorPalette,
  ...props
}: AvatarProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const AvatarStyles: StyleProps = variant === 'outline' ? { background: 'bg' } : {};

  return (
    <ChakraAvatar.Root ref={ref} variant={variant} colorPalette={colorPalette} {...AvatarStyles} {...props}>
      <ChakraAvatar.Fallback name={name} />
      <ChakraAvatar.Image src={src} alt={name} />
    </ChakraAvatar.Root>
  );
};

export { Avatar };
