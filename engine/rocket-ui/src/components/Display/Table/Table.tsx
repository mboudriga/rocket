import { Table as ChakraTable } from '@chakra-ui/react';
import { useMemo } from 'react';
import type { StyleProps } from '../../../types';

import type { TableProps } from './Table.types';

const Table = ({
  ref,
  columns,
  data,
  caption,
  ...props
}: TableProps & {
  ref?: React.Ref<HTMLTableElement>;
}) => {
  const headerCells = useMemo(
    () =>
      columns?.map(({ header, accessorKey }) => (
        <ChakraTable.ColumnHeader key={String(accessorKey)}>{header}</ChakraTable.ColumnHeader>
      )) || null,
    [columns]
  );

  const bodyRows = useMemo(
    () =>
      data?.map((row, rowIndex) => (
        <ChakraTable.Row key={rowIndex}>
          {columns?.map(({ accessorKey, cell }) => (
            <ChakraTable.Cell key={String(accessorKey)} bg="bg">
              {cell ? cell(row) : (row[accessorKey as keyof typeof row] as React.ReactNode)}
            </ChakraTable.Cell>
          ))}
        </ChakraTable.Row>
      )) || null,
    [data, columns]
  );

  return (
    <ChakraTable.Root ref={ref} {...TableStyles} {...props}>
      {caption && <ChakraTable.Caption>{caption}</ChakraTable.Caption>}
      <ChakraTable.Header>
        <ChakraTable.Row>{headerCells}</ChakraTable.Row>
      </ChakraTable.Header>
      <ChakraTable.Body>{bodyRows}</ChakraTable.Body>
    </ChakraTable.Root>
  );
};

const TableStyles: StyleProps = {
  width: '100%',
};

export { Table };
