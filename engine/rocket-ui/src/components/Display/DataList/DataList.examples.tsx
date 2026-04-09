import { ExampleSection } from '@components/_examples';
import { Badge } from '@components/Display/Badge';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { DataList } from './DataList';

const userInfo = [
  { label: 'Full Name', value: 'John Doe' },
  { label: 'Email', value: 'john.doe@example.com' },
  { label: 'Phone', value: '+1 (555) 123-4567' },
  { label: 'Location', value: 'San Francisco, CA' },
];

const orderInfo = [
  { label: 'Order ID', value: '#ORD-2024-001' },
  { label: 'Date', value: 'Jan 15, 2024' },
  { label: 'Status', value: 'Shipped' },
  { label: 'Total', value: '$156.00' },
];

export const DataListExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <DataList items={userInfo} />
      </ExampleSection>

      {/* Orientation */}
      <ExampleSection title="Orientation">
        <Flex.V gap="6">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Horizontal (default)
            </Text>
            <Box width="350px">
              <DataList orientation="horizontal" items={userInfo} />
            </Box>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Vertical
            </Text>
            <DataList orientation="vertical" items={userInfo} />
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
            <DataList
              size="sm"
              items={[
                { label: 'Name', value: 'John' },
                { label: 'Email', value: 'john@example.com' },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Medium
            </Text>
            <DataList
              size="md"
              items={[
                { label: 'Name', value: 'John' },
                { label: 'Email', value: 'john@example.com' },
              ]}
            />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Large
            </Text>
            <DataList
              size="lg"
              items={[
                { label: 'Name', value: 'John' },
                { label: 'Email', value: 'john@example.com' },
              ]}
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With custom values */}
      <ExampleSection title="With Custom Values">
        <Box width="350px">
          <DataList
            items={[
              { label: 'Status', value: <Badge colorPalette="green">Active</Badge> },
              { label: 'Plan', value: <Badge colorPalette="purple">Pro</Badge> },
              { label: 'Role', value: <Badge colorPalette="blue">Admin</Badge> },
            ]}
          />
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: Order details */}
      <ExampleSection title="Use Case: Order Details">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="400px">
          <Text fontWeight="semibold" marginBottom="3">
            Order Information
          </Text>
          <DataList items={orderInfo} />
        </Box>
      </ExampleSection>

      {/* Use case: Profile card */}
      <ExampleSection title="Use Case: Profile Details">
        <Box padding="5" border="1px solid" borderColor="border" borderRadius="lg" width="400px">
          <Flex.H gap="4" align="center" marginBottom="4">
            <Box width="60px" height="60px" borderRadius="full" bg="blue.subtle" />
            <Box>
              <Text fontWeight="semibold">John Doe</Text>
              <Text fontSize="sm" color="fg.muted">
                Software Engineer
              </Text>
            </Box>
          </Flex.H>
          <DataList items={userInfo} />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
