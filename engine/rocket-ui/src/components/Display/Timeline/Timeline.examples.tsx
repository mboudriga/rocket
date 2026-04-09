import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCheck, LuCookingPot, LuHouse, LuTruck } from 'react-icons/lu';
import { Timeline } from './Timeline';

const basicItems = [
  { title: 'Step 1', description: 'Create an account' },
  { title: 'Step 2', description: 'Set up your profile' },
  { title: 'Step 3', description: 'Start using the app' },
];

const statusItems = [
  { title: 'Order Placed', description: 'Jan 15, 2024', status: 'complete' as const },
  { title: 'Processing', description: 'Jan 16, 2024', status: 'complete' as const },
  { title: 'Shipped', description: 'Jan 17, 2024', status: 'current' as const },
  { title: 'Delivered', description: 'Expected: Jan 20, 2024', status: 'incomplete' as const },
];

export const TimelineExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Timeline items={basicItems} />
      </ExampleSection>

      {/* With status */}
      <ExampleSection title="With Status">
        <Timeline items={statusItems} />
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="8" wrap="wrap">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Solid
            </Text>
            <Timeline variant="solid" items={basicItems} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Outline
            </Text>
            <Timeline variant="outline" items={basicItems} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Subtle
            </Text>
            <Timeline variant="subtle" items={basicItems} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="8" wrap="wrap">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Small
            </Text>
            <Timeline size="sm" items={basicItems} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Medium
            </Text>
            <Timeline size="md" items={basicItems} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Large
            </Text>
            <Timeline size="lg" items={basicItems} />
          </Box>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Order tracking */}
      <ExampleSection title="Use Case: Order Tracking">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Text fontWeight="semibold" marginBottom="4">
            Order Status
          </Text>
          <Timeline
            items={[
              {
                title: 'Order Confirmed',
                description: 'Your order has been confirmed',
                icon: <LuCheck />,
                status: 'complete',
              },
              {
                title: 'Preparing',
                description: 'Your order is being prepared',
                icon: <LuCookingPot />,
                status: 'complete',
              },
              {
                title: 'Out for Delivery',
                description: 'Package is on its way',
                icon: <LuTruck />,
                status: 'current',
              },
              {
                title: 'Delivered',
                description: 'Package delivered',
                icon: <LuHouse />,
                status: 'incomplete',
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Use case: Process steps */}
      <ExampleSection title="Use Case: Getting Started Guide">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Text fontWeight="semibold" marginBottom="4">
            Setup Instructions
          </Text>
          <Timeline
            items={[
              { title: 'Install Dependencies', description: 'Run npm install to get started' },
              {
                title: 'Configure Environment',
                description: 'Set up your .env file with required variables',
              },
              { title: 'Start Development', description: 'Run npm run dev to start the server' },
              {
                title: 'Build for Production',
                description: 'Use npm run build when ready to deploy',
              },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Use case: Version history */}
      <ExampleSection title="Use Case: Version History">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Text fontWeight="semibold" marginBottom="4">
            Recent Changes
          </Text>
          <Timeline
            variant="subtle"
            size="sm"
            items={[
              { title: 'v2.0.0', description: 'Major release with new features' },
              { title: 'v1.5.0', description: 'Added dark mode support' },
              { title: 'v1.4.0', description: 'Performance improvements' },
              { title: 'v1.3.0', description: 'Bug fixes and stability updates' },
            ]}
          />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
