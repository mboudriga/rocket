import { Badge as ChakraBadge } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import { BadgeDefaultProps, type BadgeProps } from './Badge.types';

const Badge = ({
  ref,
  size = BadgeDefaultProps.size,
  variant = BadgeDefaultProps.variant,
  colorPalette = BadgeDefaultProps.colorPalette,
  ...props
}: BadgeProps & {
  ref?: React.Ref<HTMLSpanElement>;
}) => {
  const BadgeStyles: StyleProps = useMemo(() => {
    const baseStyles = (() => {
      switch (size) {
        case 'xs':
          return { height: '20px', padding: '0 6px' };
        case 'sm':
          return { height: '28px', padding: '0 8px' };
        case 'lg':
          return { height: '40px', padding: '0 12px' };
        default:
          return { height: '32px', padding: '0 10px' };
      }
    })();

    return variant === 'outline' ? { ...baseStyles, background: 'bg' } : baseStyles;
  }, [size, variant]);

  return <ChakraBadge ref={ref} variant={variant} colorPalette={colorPalette} {...BadgeStyles} {...props} />;
};

export { Badge };
