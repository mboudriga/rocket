import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Heading } from '@components/Typography/Heading';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Card } from './Card';

export const CardExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" wrap="wrap">
          <Card width="220px" variant="outline" title="Outline">
            <Text fontSize="sm">Default variant with border.</Text>
          </Card>
          <Card width="220px" variant="elevated" title="Elevated">
            <Text fontSize="sm">Elevated with shadow.</Text>
          </Card>
          <Card width="220px" variant="subtle" title="Subtle">
            <Text fontSize="sm">Subtle background.</Text>
          </Card>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <Card width="300px" size="sm" title="Small">
            <Text fontSize="sm">Compact padding.</Text>
          </Card>
          <Card width="300px" size="md" title="Medium">
            <Text fontSize="sm">Default padding.</Text>
          </Card>
          <Card width="300px" size="lg" title="Large">
            <Text fontSize="sm">Spacious padding.</Text>
          </Card>
        </Flex.V>
      </ExampleSection>

      {/* With description */}
      <ExampleSection title="With Description">
        <Card width="350px" title="Settings" description="Configure your account preferences.">
          <Text fontSize="sm">Body content goes here.</Text>
        </Card>
      </ExampleSection>

      {/* With buttons */}
      <ExampleSection title="With Buttons (like Dialog)">
        <Card
          width="350px"
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          buttons={[
            { children: 'Cancel', variant: 'ghost' },
            { children: 'Confirm', colorPalette: 'blue' },
          ]}
        >
          <Text fontSize="sm">This action cannot be undone.</Text>
        </Card>
      </ExampleSection>

      {/* With custom footer */}
      <ExampleSection title="With Custom Footer">
        <Card
          width="350px"
          title="Stats"
          footer={
            <Flex.H justify="space-between" width="100%">
              <Text fontSize="xs" color="fg.muted">
                Last updated: 2 min ago
              </Text>
              <Text fontSize="xs" color="fg.muted">
                Source: API
              </Text>
            </Flex.H>
          }
        >
          <Heading size="2xl">1,234</Heading>
          <Text fontSize="sm" color="fg.muted">
            Active users
          </Text>
        </Card>
      </ExampleSection>

      <Divider />

      {/* Use case: Product card */}
      <ExampleSection title="Use Case: Product Card">
        <Card width="300px" padding="0" overflow="hidden">
          <Box height="150px" bg="bg.muted" />
          <Box padding="4">
            <Heading size="sm" marginBottom="1">
              Product Name
            </Heading>
            <Text fontSize="sm" color="fg.muted" marginBottom="3">
              High-quality product with amazing features
            </Text>
            <Flex.H justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="lg">
                $99.00
              </Text>
            </Flex.H>
          </Box>
        </Card>
      </ExampleSection>

      {/* Use case: Stats cards */}
      <ExampleSection title="Use Case: Stats Cards">
        <Flex.H gap="4" wrap="wrap">
          {[
            { label: 'Total Users', value: '12,345', palette: 'blue' },
            { label: 'Revenue', value: '$54,321', palette: 'green' },
            { label: 'Orders', value: '1,234', palette: 'purple' },
          ].map((stat) => (
            <Card key={stat.label} width="150px" variant="subtle" textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color={`${stat.palette}.fg`}>
                {stat.value}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {stat.label}
              </Text>
            </Card>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Use case: Feature cards */}
      <ExampleSection title="Use Case: Feature Cards">
        <Flex.H gap="4" wrap="wrap">
          {[
            { title: 'Fast', desc: 'Lightning-fast performance' },
            { title: 'Secure', desc: 'Enterprise-grade security' },
            { title: 'Simple', desc: 'Easy to use and maintain' },
          ].map((feature) => (
            <Card key={feature.title} width="180px" title={feature.title} variant="elevated">
              <Text fontSize="sm" color="fg.muted">
                {feature.desc}
              </Text>
            </Card>
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
