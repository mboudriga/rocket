import { ExampleSection } from '@components/_examples';
import { Badge } from '@components/Display/Badge';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Table } from './Table';

const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', role: 'Editor' },
];

const basicColumns = [
  { header: 'Name', accessorKey: 'name' as const },
  { header: 'Email', accessorKey: 'email' as const },
  { header: 'Role', accessorKey: 'role' as const },
];

const columnsWithStatus = [
  { header: 'Name', accessorKey: 'name' as const },
  { header: 'Email', accessorKey: 'email' as const },
  {
    header: 'Status',
    accessorKey: 'status' as const,
    cell: (row: Record<string, unknown>) => (
      <Badge colorPalette={row.status === 'Active' ? 'green' : 'gray'} size="sm">
        {String(row.status)}
      </Badge>
    ),
  },
  { header: 'Role', accessorKey: 'role' as const },
];

export const TableExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic Table">
        <Box maxWidth="600px">
          <Table columns={basicColumns} data={userData} />
        </Box>
      </ExampleSection>

      {/* With caption */}
      <ExampleSection title="With Caption">
        <Box maxWidth="600px">
          <Table columns={basicColumns} data={userData} caption="List of registered users" />
        </Box>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="6">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Line (default)
            </Text>
            <Box maxWidth="500px">
              <Table variant="line" columns={basicColumns} data={userData.slice(0, 3)} />
            </Box>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Outline
            </Text>
            <Box maxWidth="500px">
              <Table variant="outline" columns={basicColumns} data={userData.slice(0, 3)} />
            </Box>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="6">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Small
            </Text>
            <Box maxWidth="500px">
              <Table size="sm" columns={basicColumns} data={userData.slice(0, 2)} />
            </Box>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Medium
            </Text>
            <Box maxWidth="500px">
              <Table size="md" columns={basicColumns} data={userData.slice(0, 2)} />
            </Box>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Large
            </Text>
            <Box maxWidth="500px">
              <Table size="lg" columns={basicColumns} data={userData.slice(0, 2)} />
            </Box>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Striped */}
      <ExampleSection title="Striped">
        <Box maxWidth="600px">
          <Table striped columns={basicColumns} data={userData} />
        </Box>
      </ExampleSection>

      {/* With column borders */}
      <ExampleSection title="With Column Borders">
        <Box maxWidth="600px">
          <Table showColumnBorder columns={basicColumns} data={userData} />
        </Box>
      </ExampleSection>

      {/* Custom cell rendering */}
      <ExampleSection title="Custom Cell Rendering">
        <Box maxWidth="700px">
          <Table columns={columnsWithStatus} data={userData} />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
