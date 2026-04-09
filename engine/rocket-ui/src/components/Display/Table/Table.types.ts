import type { TableRootProps } from '@chakra-ui/react';

export interface TableColumnProps<T = Record<string, unknown>> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> extends Omit<TableRootProps, 'columns'> {
  columns?: Array<TableColumnProps<T>>;
  data?: Array<T>;
  caption?: string;
  showColumnBorder?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'line' | 'outline';
}

export const TableDefaultProps: TableProps = {
  showColumnBorder: false,
  striped: false,
  stickyHeader: false,
  size: 'md',
  variant: 'line',
};
