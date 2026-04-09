import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Box } from './Box';

export const BoxExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box padding="4" bg="bg.muted" borderRadius="md">
          <Text>A basic Box with padding and background</Text>
        </Box>
      </ExampleSection>

      {/* Styling */}
      <ExampleSection title="Styling">
        <Flex.H gap="4" wrap="wrap">
          <Box padding="4" bg="blue.subtle" borderRadius="md">
            <Text>Blue background</Text>
          </Box>
          <Box padding="4" border="2px solid" borderColor="green.solid" borderRadius="lg">
            <Text>Green border</Text>
          </Box>
          <Box padding="4" boxShadow="lg" borderRadius="md" bg="bg">
            <Text>With shadow</Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Border Radius */}
      <ExampleSection title="Border Radius">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Box padding="4" bg="purple.subtle" borderRadius="none">
            <Text fontSize="sm">none</Text>
          </Box>
          <Box padding="4" bg="purple.subtle" borderRadius="sm">
            <Text fontSize="sm">sm</Text>
          </Box>
          <Box padding="4" bg="purple.subtle" borderRadius="md">
            <Text fontSize="sm">md</Text>
          </Box>
          <Box padding="4" bg="purple.subtle" borderRadius="lg">
            <Text fontSize="sm">lg</Text>
          </Box>
          <Box padding="4" bg="purple.subtle" borderRadius="xl">
            <Text fontSize="sm">xl</Text>
          </Box>
          <Box padding="4" bg="purple.subtle" borderRadius="full">
            <Text fontSize="sm">full</Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* As prop (polymorphism) */}
      <ExampleSection title="As Different Elements">
        <Flex.V gap="3">
          <Box as="section" padding="4" bg="orange.subtle" borderRadius="md">
            <Text>Rendered as &lt;section&gt;</Text>
          </Box>
          <Box as="article" padding="4" bg="teal.subtle" borderRadius="md">
            <Text>Rendered as &lt;article&gt;</Text>
          </Box>
          <Box as="aside" padding="4" bg="pink.subtle" borderRadius="md">
            <Text>Rendered as &lt;aside&gt;</Text>
          </Box>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
