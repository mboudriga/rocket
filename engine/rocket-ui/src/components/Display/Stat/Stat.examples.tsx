import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Stat } from './Stat';

export const StatExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Stat label="Total Sales">$45,670</Stat>
      </ExampleSection>

      {/* With subLabel */}
      <ExampleSection title="With SubLabel">
        <Stat label="Revenue" subLabel="Last 30 days">
          $128,430
        </Stat>
      </ExampleSection>

      {/* Multiple stats */}
      <ExampleSection title="Multiple Stats">
        <Flex.H gap="8" wrap="wrap">
          <Stat label="Users">12,450</Stat>
          <Stat label="Revenue">$89,200</Stat>
          <Stat label="Orders">3,456</Stat>
        </Flex.H>
      </ExampleSection>

      {/* With subLabels showing trends */}
      <ExampleSection title="With Trend Information">
        <Flex.H gap="8" wrap="wrap">
          <Stat label="Sales" subLabel="+23% from last month">
            $45,670
          </Stat>
          <Stat label="Expenses" subLabel="-8% from last month">
            $12,340
          </Stat>
          <Stat label="Profit" subLabel="+15% from last month">
            $33,330
          </Stat>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Dashboard cards */}
      <ExampleSection title="Use Case: Dashboard Stats">
        <Flex.H gap="4" wrap="wrap">
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="180px">
            <Stat label="Total Users" subLabel="+12% this week">
              8,492
            </Stat>
          </Box>
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="180px">
            <Stat label="Revenue" subLabel="+18% this month">
              $45.2k
            </Stat>
          </Box>
          <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="180px">
            <Stat label="Bounce Rate" subLabel="-5% improved">
              24.3%
            </Stat>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Metrics */}
      <ExampleSection title="Use Case: Performance Metrics">
        <Box
          padding="6"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.H gap="12">
            <Stat label="Page Views" subLabel="Last 7 days">
              1.2M
            </Stat>
            <Stat label="Avg. Time" subLabel="Per session">
              4:32
            </Stat>
            <Stat label="Conversion" subLabel="Click to buy">
              3.2%
            </Stat>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Simple metrics */}
      <ExampleSection title="Use Case: Simple Metrics">
        <Box padding="4" bg="blue.subtle" borderRadius="lg" width="300px">
          <Flex.H gap="8" justify="space-between">
            <Stat label="Projects">42</Stat>
            <Stat label="Tasks">156</Stat>
            <Stat label="Done">89</Stat>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: E-commerce stats */}
      <ExampleSection title="Use Case: E-commerce Overview">
        <Flex.H gap="4" wrap="wrap">
          {[
            { label: 'Products', value: '1,234', sub: 'In stock' },
            { label: 'Orders', value: '567', sub: 'This month' },
            { label: 'Customers', value: '8.9k', sub: 'Active' },
            { label: 'Revenue', value: '$45k', sub: 'This quarter' },
          ].map((stat) => (
            <Box
              key={stat.label}
              padding="4"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              width="150px"
            >
              <Stat label={stat.label} subLabel={stat.sub}>
                {stat.value}
              </Stat>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
