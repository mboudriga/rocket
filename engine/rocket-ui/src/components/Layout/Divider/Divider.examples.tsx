import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Divider } from './Divider';

export const DividerExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box padding="4" bg="bg.subtle" borderRadius="md">
          <Text marginBottom="2">Content above</Text>
          <Divider />
          <Text marginTop="2">Content below</Text>
        </Box>
      </ExampleSection>

      {/* Orientations */}
      <ExampleSection title="Orientations">
        <Flex.H gap="6" align="stretch">
          <Box flex="1">
            <Text fontSize="sm" marginBottom="2">
              Horizontal (default)
            </Text>
            <Box padding="4" bg="bg.subtle" borderRadius="md">
              <Text>Section 1</Text>
              <Divider marginY="2" />
              <Text>Section 2</Text>
            </Box>
          </Box>
          <Box flex="1">
            <Text fontSize="sm" marginBottom="2">
              Vertical
            </Text>
            <Flex.H
              gap="4"
              padding="4"
              bg="bg.subtle"
              borderRadius="md"
              height="80px"
              align="center"
            >
              <Text>Left</Text>
              <Divider orientation="vertical" height="100%" />
              <Text>Right</Text>
            </Flex.H>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Gray (default)
            </Text>
            <Divider borderColor="border" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Blue
            </Text>
            <Divider borderColor="blue.solid" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Green
            </Text>
            <Divider borderColor="green.solid" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Red
            </Text>
            <Divider borderColor="red.solid" />
          </Box>
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use case: Section separator */}
      <ExampleSection title="Use Case: Section Separator">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg">
          <Text fontWeight="semibold">Account Settings</Text>
          <Text fontSize="sm" color="fg.muted" marginTop="1">
            Manage your account preferences
          </Text>
          <Divider marginY="4" />
          <Text fontWeight="semibold">Privacy Settings</Text>
          <Text fontSize="sm" color="fg.muted" marginTop="1">
            Control who can see your information
          </Text>
          <Divider marginY="4" />
          <Text fontWeight="semibold">Notification Settings</Text>
          <Text fontSize="sm" color="fg.muted" marginTop="1">
            Choose what updates you receive
          </Text>
        </Box>
      </ExampleSection>

      {/* Use case: Inline content separator */}
      <ExampleSection title="Use Case: Inline Separator">
        <Flex.H gap="3" align="center" padding="4" bg="bg.subtle" borderRadius="md">
          <Text fontSize="sm">Home</Text>
          <Divider orientation="vertical" height="16px" />
          <Text fontSize="sm">Products</Text>
          <Divider orientation="vertical" height="16px" />
          <Text fontSize="sm">About</Text>
          <Divider orientation="vertical" height="16px" />
          <Text fontSize="sm">Contact</Text>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
