import type { EmptyStateRootProps } from '@chakra-ui/react';

export interface EmptyStateProps extends EmptyStateRootProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyStateDefaultProps: EmptyStateProps = {
  size: 'md',
};
