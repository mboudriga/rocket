import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Flex } from './Flex';

export const FlexExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic Flex */}
      <ExampleSection title="Basic Flex">
        <Flex gap="4" padding="4" bg="bg.muted" borderRadius="md">
          <Box padding="3" bg="blue.muted" borderRadius="md">
            <Text>Item 1</Text>
          </Box>
          <Box padding="3" bg="blue.muted" borderRadius="md">
            <Text>Item 2</Text>
          </Box>
          <Box padding="3" bg="blue.muted" borderRadius="md">
            <Text>Item 3</Text>
          </Box>
        </Flex>
      </ExampleSection>

      {/* Flex.V (Vertical) */}
      <ExampleSection title="Flex.V (Vertical)">
        <Flex.V gap="3" padding="4" bg="bg.muted" borderRadius="md">
          <Box padding="3" bg="green.muted" borderRadius="md">
            <Text>Row 1</Text>
          </Box>
          <Box padding="3" bg="green.muted" borderRadius="md">
            <Text>Row 2</Text>
          </Box>
          <Box padding="3" bg="green.muted" borderRadius="md">
            <Text>Row 3</Text>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Flex.H (Horizontal) */}
      <ExampleSection title="Flex.H (Horizontal)">
        <Flex.H gap="3" padding="4" bg="bg.muted" borderRadius="md">
          <Box padding="3" bg="purple.muted" borderRadius="md">
            <Text>Column 1</Text>
          </Box>
          <Box padding="3" bg="purple.muted" borderRadius="md">
            <Text>Column 2</Text>
          </Box>
          <Box padding="3" bg="purple.muted" borderRadius="md">
            <Text>Column 3</Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Alignment */}
      <ExampleSection title="Alignment">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="start"
            </Text>
            <Flex.H justify="start" gap="2" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">A</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">B</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">C</Text>
              </Box>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="center"
            </Text>
            <Flex.H justify="center" gap="2" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">A</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">B</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">C</Text>
              </Box>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="end"
            </Text>
            <Flex.H justify="end" gap="2" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">A</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">B</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">C</Text>
              </Box>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="space-between"
            </Text>
            <Flex.H justify="space-between" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">A</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">B</Text>
              </Box>
              <Box padding="2" bg="orange.muted" borderRadius="md">
                <Text fontSize="sm">C</Text>
              </Box>
            </Flex.H>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Distributing Space */}
      <ExampleSection title="Distributing Space">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="space-between" — push items to opposite ends
            </Text>
            <Flex.H justify="space-between" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Left</Text>
              </Box>
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Right</Text>
              </Box>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              flex="1" zones — even distribution
            </Text>
            <Flex.H padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">One</Text>
              </Box>
              <Box flex="1" />
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Two</Text>
              </Box>
              <Box flex="1" />
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Three</Text>
              </Box>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              marginLeft="auto" — push one item to the end
            </Text>
            <Flex.H gap="2" padding="3" bg="bg.muted" borderRadius="md">
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Left 1</Text>
              </Box>
              <Box padding="2" bg="teal.muted" borderRadius="md">
                <Text fontSize="sm">Left 2</Text>
              </Box>
              <Box padding="2" bg="teal.muted" borderRadius="md" marginLeft="auto">
                <Text fontSize="sm">Right (auto)</Text>
              </Box>
            </Flex.H>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* as Prop (Semantic HTML) */}
      <ExampleSection title="as Prop (Semantic HTML)">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Flex.H as="nav"
            </Text>
            <Flex.H as="nav" gap="4" padding="3" bg="bg.muted" borderRadius="md">
              <Text fontSize="sm" fontWeight="medium">
                Home
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                About
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                Contact
              </Text>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Flex.V as="section"
            </Text>
            <Flex.V as="section" gap="2" padding="3" bg="bg.muted" borderRadius="md">
              <Text fontSize="sm" fontWeight="bold">
                Section Title
              </Text>
              <Text fontSize="sm">Section content goes here.</Text>
            </Flex.V>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Flex.H as="header"
            </Text>
            <Flex.H
              as="header"
              justify="space-between"
              align="center"
              padding="3"
              bg="bg.muted"
              borderRadius="md"
            >
              <Text fontSize="sm" fontWeight="bold">
                App Name
              </Text>
              <Text fontSize="sm">Settings</Text>
            </Flex.H>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Flex.V as="ul" with Box as="li"
            </Text>
            <Flex.V
              as="ul"
              gap="1"
              padding="3"
              bg="bg.muted"
              borderRadius="md"
              listStyleType="none"
            >
              <Box as="li">
                <Text fontSize="sm">Item One</Text>
              </Box>
              <Box as="li">
                <Text fontSize="sm">Item Two</Text>
              </Box>
              <Box as="li">
                <Text fontSize="sm">Item Three</Text>
              </Box>
            </Flex.V>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Wrapping */}
      <ExampleSection title="Wrapping">
        <Flex.H wrap="wrap" gap="3" padding="4" bg="bg.muted" borderRadius="md">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Box
              key={i}
              padding="3"
              bg="pink.muted"
              borderRadius="md"
              minWidth="80px"
              textAlign="center"
            >
              <Text fontSize="sm">Item {i}</Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
