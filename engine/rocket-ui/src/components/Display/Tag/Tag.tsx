import { Tag as ChakraTag } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import { TagDefaultProps, type TagProps } from './Tag.types';

const Tag = ({
  ref,
  children,
  size = TagDefaultProps.size,
  variant = TagDefaultProps.variant,
  colorPalette = TagDefaultProps.colorPalette,
  rightIcon,
  leftIcon,
  onClose,
  ...props
}: TagProps & {
  ref?: React.Ref<HTMLSpanElement>;
}) => {
  const TagStyles: StyleProps = useMemo(() => {
    const baseStyles = (() => {
      switch (size) {
        case 'sm':
          return { height: '28px', padding: '0 8px' };
        case 'lg':
          return { height: '40px', padding: '0 12px' };
        case 'xl':
          return { height: '48px', padding: '0 16px' };
        default:
          return { height: '32px', padding: '0 10px' };
      }
    })();

    return variant === 'outline' ? { ...baseStyles, background: 'bg' } : baseStyles;
  }, [size, variant]);

  return (
    <ChakraTag.Root ref={ref} variant={variant} colorPalette={colorPalette} {...TagStyles} {...props}>
      {leftIcon && <ChakraTag.StartElement>{leftIcon}</ChakraTag.StartElement>}
      <ChakraTag.Label>{children}</ChakraTag.Label>
      {rightIcon && <ChakraTag.EndElement>{rightIcon}</ChakraTag.EndElement>}
      {onClose && <ChakraTag.CloseTrigger onClick={() => onClose()} aria-label="Remove" />}
    </ChakraTag.Root>
  );
};

export { Tag };
