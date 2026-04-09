import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuArrowRight, LuCheck, LuCircle, LuStar } from 'react-icons/lu';
import { List } from './List';

export const ListExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic unordered */}
      <ExampleSection title="Basic Unordered List">
        <List>
          <Text>First item</Text>
          <Text>Second item</Text>
          <Text>Third item</Text>
        </List>
      </ExampleSection>

      {/* With custom icon */}
      <ExampleSection title="With Custom Icon">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Check icon
            </Text>
            <List icon={<LuCheck />} iconColor="green.fg">
              <Text>Completed task one</Text>
              <Text>Completed task two</Text>
              <Text>Completed task three</Text>
            </List>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Circle icon
            </Text>
            <List icon={<LuCircle />} iconColor="blue.fg">
              <Text>List item one</Text>
              <Text>List item two</Text>
              <Text>List item three</Text>
            </List>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Star icon
            </Text>
            <List icon={<LuStar />} iconColor="yellow.fg">
              <Text>Feature one</Text>
              <Text>Feature two</Text>
              <Text>Feature three</Text>
            </List>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Different icon colors */}
      <ExampleSection title="Icon Colors">
        <Flex.H gap="6" wrap="wrap">
          {[
            { color: 'blue.fg', label: 'Blue' },
            { color: 'green.fg', label: 'Green' },
            { color: 'red.fg', label: 'Red' },
            { color: 'purple.fg', label: 'Purple' },
          ].map((item) => (
            <Box key={item.label}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {item.label}
              </Text>
              <List icon={<LuArrowRight />} iconColor={item.color}>
                <Text fontSize="sm">Item one</Text>
                <Text fontSize="sm">Item two</Text>
              </List>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Features list */}
      <ExampleSection title="Use Case: Features List">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="md" width="350px">
          <Text fontWeight="semibold" marginBottom="3">
            Key Features
          </Text>
          <List icon={<LuCheck />} iconColor="green.fg">
            <Text fontSize="sm">Fast and reliable performance</Text>
            <Text fontSize="sm">Easy to use interface</Text>
            <Text fontSize="sm">24/7 customer support</Text>
            <Text fontSize="sm">Regular updates and improvements</Text>
          </List>
        </Box>
      </ExampleSection>

      {/* Use case: Requirements */}
      <ExampleSection title="Use Case: System Requirements">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="md" width="350px">
          <Text fontWeight="semibold" marginBottom="3">
            System Requirements
          </Text>
          <List icon={<LuCircle />} iconColor="fg.subtle">
            <Text fontSize="sm">Node.js 18 or higher</Text>
            <Text fontSize="sm">4GB RAM minimum</Text>
            <Text fontSize="sm">Modern web browser</Text>
            <Text fontSize="sm">Internet connection</Text>
          </List>
        </Box>
      </ExampleSection>

      {/* Use case: Pricing features */}
      <ExampleSection title="Use Case: Pricing Features">
        <Box padding="4" bg="blue.subtle" borderRadius="md" width="300px">
          <Text fontWeight="bold" fontSize="lg" marginBottom="1">
            Pro Plan
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="blue.fg" marginBottom="3">
            $29/month
          </Text>
          <List icon={<LuCheck />} iconColor="blue.fg">
            <Text fontSize="sm">Unlimited projects</Text>
            <Text fontSize="sm">Priority support</Text>
            <Text fontSize="sm">Advanced analytics</Text>
            <Text fontSize="sm">Custom integrations</Text>
            <Text fontSize="sm">Team collaboration</Text>
          </List>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
