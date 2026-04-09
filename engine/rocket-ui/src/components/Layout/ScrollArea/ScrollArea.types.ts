import type { HTMLChakraProps } from '@chakra-ui/react';

export interface ScrollAreaProps extends HTMLChakraProps<'div'> {
  orientation?: 'vertical' | 'horizontal' | 'both';
  size?: 'sm' | 'md' | 'lg';
  hideScrollbar?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const ScrollAreaDefaultProps: Partial<ScrollAreaProps> = {
  orientation: 'vertical',
  size: 'md',
  hideScrollbar: false,
};
