import type { SeparatorProps } from '@chakra-ui/react';

export interface DividerProps extends SeparatorProps {
  orientation?: 'vertical' | 'horizontal';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
export const DividerDefaultProps: DividerProps = {
  orientation: 'horizontal',
  borderColor: 'gray.300',
  variant: 'solid',
  size: 'sm',
};
