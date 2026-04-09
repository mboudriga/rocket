import type { HeadingProps as ChakraHeadingProps, HighlightProps } from '@chakra-ui/react';

export interface HeadingProps extends ChakraHeadingProps {
  highlight?: Omit<HighlightProps, 'children'>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export const HeadingDefaultProps: HeadingProps = { size: '2xl' };
