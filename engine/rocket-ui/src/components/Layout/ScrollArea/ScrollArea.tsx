import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

import { ScrollAreaDefaultProps, type ScrollAreaProps } from './ScrollArea.types';

const scrollbarSizes = {
  sm: '6px',
  md: '10px',
  lg: '14px',
};

const ScrollArea = ({
  ref,
  orientation = ScrollAreaDefaultProps.orientation ?? 'vertical',
  size = ScrollAreaDefaultProps.size ?? 'md',
  hideScrollbar = ScrollAreaDefaultProps.hideScrollbar ?? false,
  children,
  ...props
}: ScrollAreaProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const scrollbarWidth = scrollbarSizes[size];

  const overflowStyles = useMemo(() => {
    switch (orientation) {
      case 'horizontal':
        return { overflowX: 'auto' as const, overflowY: 'hidden' as const };
      case 'both':
        return { overflow: 'auto' as const };
      default:
        return { overflowX: 'hidden' as const, overflowY: 'auto' as const };
    }
  }, [orientation]);

  const scrollbarStyles = useMemo(() => {
    if (hideScrollbar) {
      return {
        scrollbarWidth: 'none' as const,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      };
    }

    return {
      scrollbarColor: 'var(--chakra-colors-border) transparent',
      '&::-webkit-scrollbar': {
        width: scrollbarWidth,
        height: scrollbarWidth,
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        borderRadius: scrollbarWidth,
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'var(--chakra-colors-border)',
        borderRadius: scrollbarWidth,
        border: '1px solid transparent',
        backgroundClip: 'content-box',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'var(--chakra-colors-fg-subtle)',
        backgroundClip: 'content-box',
      },
      '&::-webkit-scrollbar-corner': {
        background: 'transparent',
      },
    };
  }, [hideScrollbar, scrollbarWidth]);

  return (
    <Box ref={ref} tabIndex={0} role="region" aria-label="Scrollable content" {...overflowStyles} css={scrollbarStyles} {...props}>
      {children}
    </Box>
  );
};

export { ScrollArea };
