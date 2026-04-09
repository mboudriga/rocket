import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Heading } from './Heading';

export const HeadingExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Heading>This is a Heading</Heading>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="3">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const).map((size) => (
            <Heading key={size} size={size}>
              Heading size: {size}
            </Heading>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* As different HTML elements (rendered as p to preserve page heading order) */}
      <ExampleSection title="As Different HTML Elements">
        <Flex.V gap="3">
          <Heading as="p" size="xl">
            H1 Heading
          </Heading>
          <Heading as="p" size="lg">
            H2 Heading
          </Heading>
          <Heading as="p" size="md">
            H3 Heading
          </Heading>
          <Heading as="p" size="sm">
            H4 Heading
          </Heading>
          <Heading as="p" size="xs">
            H5 Heading
          </Heading>
          <Heading as="p" size="xs">
            H6 Heading
          </Heading>
        </Flex.V>
      </ExampleSection>

      {/* Font weights */}
      <ExampleSection title="Font Weights">
        <Flex.V gap="2">
          <Heading size="lg" fontWeight="normal">
            Normal weight heading
          </Heading>
          <Heading size="lg" fontWeight="medium">
            Medium weight heading
          </Heading>
          <Heading size="lg" fontWeight="semibold">
            Semibold weight heading
          </Heading>
          <Heading size="lg" fontWeight="bold">
            Bold weight heading (default)
          </Heading>
        </Flex.V>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.V gap="2">
          <Heading size="md" color="fg">
            Default heading color
          </Heading>
          <Heading size="md" color="blue.fg">
            Blue heading
          </Heading>
          <Heading size="md" color="green.fg">
            Green heading
          </Heading>
          <Heading size="md" color="purple.fg">
            Purple heading
          </Heading>
          <Heading size="md" color="red.fg">
            Red heading
          </Heading>
        </Flex.V>
      </ExampleSection>

      {/* With highlight */}
      <ExampleSection title="With Highlight">
        <Flex.V gap="3">
          <Heading
            size="lg"
            highlight={{ query: 'Amazing', styles: { bg: 'yellow.subtle', px: '1' } }}
          >
            Build Amazing User Interfaces
          </Heading>
          <Heading
            size="md"
            highlight={{ query: 'React', styles: { bg: 'blue.subtle', color: 'blue.fg', px: '1' } }}
          >
            Welcome to React Documentation
          </Heading>
        </Flex.V>
      </ExampleSection>

      {/* Text alignment */}
      <ExampleSection title="Text Alignment">
        <Flex.V gap="2">
          <Box bg="bg.subtle" padding="3" borderRadius="md">
            <Heading size="md" textAlign="left">
              Left aligned
            </Heading>
          </Box>
          <Box bg="bg.subtle" padding="3" borderRadius="md">
            <Heading size="md" textAlign="center">
              Center aligned
            </Heading>
          </Box>
          <Box bg="bg.subtle" padding="3" borderRadius="md">
            <Heading size="md" textAlign="right">
              Right aligned
            </Heading>
          </Box>
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use case: Page header */}
      <ExampleSection title="Use Case: Page Header">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="6">
          <Heading as="p" size="2xl" marginBottom="2">
            Dashboard
          </Heading>
          <Text color="fg.muted">Welcome back! Here&apos;s an overview of your account.</Text>
        </Box>
      </ExampleSection>

      {/* Use case: Article headings */}
      <ExampleSection title="Use Case: Article Hierarchy">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4" maxWidth="500px">
          <Heading as="p" size="xl" marginBottom="4">
            Getting Started Guide
          </Heading>
          <Heading as="p" size="lg" marginBottom="2">
            Installation
          </Heading>
          <Text color="fg.muted" marginBottom="4" fontSize="sm">
            Follow these steps to install the library...
          </Text>
          <Heading as="p" size="md" marginBottom="2">
            Using npm
          </Heading>
          <Text color="fg.muted" marginBottom="3" fontSize="sm">
            Run the following command in your terminal...
          </Text>
          <Heading as="p" size="md" marginBottom="2">
            Using yarn
          </Heading>
          <Text color="fg.muted" fontSize="sm">
            Alternatively, you can use yarn...
          </Text>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
