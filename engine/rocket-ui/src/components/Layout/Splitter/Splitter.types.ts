import type { SplitterRootProps } from '@chakra-ui/react';

export interface SplitterPanelProps {
  id: string;
  children?: React.ReactNode;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}

export interface SplitterProps extends Omit<SplitterRootProps, 'size' | 'panels' | 'children'> {
  panels?: Array<SplitterPanelProps>;
  orientation?: 'horizontal' | 'vertical';
}

export const SplitterDefaultProps: SplitterProps = {
  orientation: 'horizontal',
};
