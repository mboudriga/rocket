import type { DataListRootProps } from '@chakra-ui/react';

export interface DataListItemProps {
  label: string;
  value: React.ReactNode;
}

export interface DataListProps extends DataListRootProps {
  items?: Array<DataListItemProps>;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const DataListDefaultProps: DataListProps = {
  orientation: 'horizontal',
  size: 'md',
};
