import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { ScrollArea } from './ScrollArea';

export const ScrollAreaExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <ScrollArea
          aria-label="Basic scroll example"
          maxHeight="150px"
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
        >
          <Flex.V gap="2">
            {Array.from({ length: 15 }, (_, i) => (
              <Text key={i}>Scrollable content line {i + 1}</Text>
            ))}
          </Flex.V>
        </ScrollArea>
      </ExampleSection>

      {/* Orientations */}
      <ExampleSection title="Orientations">
        <Flex.H gap="6" wrap="wrap" align="start">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Vertical (default)
            </Text>
            <ScrollArea
              aria-label="Vertical scroll example"
              orientation="vertical"
              maxHeight="120px"
              width="200px"
              padding="3"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
            >
              <Flex.V gap="2">
                {Array.from({ length: 10 }, (_, i) => (
                  <Text key={i} fontSize="sm">
                    Item {i + 1}
                  </Text>
                ))}
              </Flex.V>
            </ScrollArea>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Horizontal
            </Text>
            <ScrollArea
              aria-label="Horizontal scroll example"
              orientation="horizontal"
              maxWidth="200px"
              padding="3"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
            >
              <Flex.H gap="3">
                {Array.from({ length: 10 }, (_, i) => (
                  <Box
                    key={i}
                    minWidth="80px"
                    padding="3"
                    bg="bg.muted"
                    borderRadius="md"
                    textAlign="center"
                  >
                    <Text fontSize="sm">Item {i + 1}</Text>
                  </Box>
                ))}
              </Flex.H>
            </ScrollArea>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Both
            </Text>
            <ScrollArea
              aria-label="Both directions scroll example"
              orientation="both"
              maxHeight="120px"
              maxWidth="200px"
              padding="3"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
            >
              <Box width="400px">
                <Flex.V gap="2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Text key={i} fontSize="sm" whiteSpace="nowrap">
                      This is a long line of content that needs horizontal scrolling - Item {i + 1}
                    </Text>
                  ))}
                </Flex.V>
              </Box>
            </ScrollArea>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Scrollbar Sizes">
        <Flex.H gap="6" wrap="wrap" align="start">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {size}
              </Text>
              <ScrollArea
                aria-label={`${size} scrollbar size example`}
                size={size}
                maxHeight="100px"
                width="150px"
                padding="3"
                border="1px solid"
                borderColor="border"
                borderRadius="md"
              >
                <Flex.V gap="2">
                  {Array.from({ length: 10 }, (_, i) => (
                    <Text key={i} fontSize="sm">
                      Line {i + 1}
                    </Text>
                  ))}
                </Flex.V>
              </ScrollArea>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Hidden scrollbar */}
      <ExampleSection title="Hidden Scrollbar">
        <Flex.H gap="6" wrap="wrap" align="start">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Visible
            </Text>
            <ScrollArea
              aria-label="Visible scrollbar example"
              maxHeight="100px"
              width="150px"
              padding="3"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
            >
              <Flex.V gap="2">
                {Array.from({ length: 10 }, (_, i) => (
                  <Text key={i} fontSize="sm">
                    Line {i + 1}
                  </Text>
                ))}
              </Flex.V>
            </ScrollArea>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Hidden
            </Text>
            <ScrollArea
              aria-label="Hidden scrollbar example"
              hideScrollbar
              maxHeight="100px"
              width="150px"
              padding="3"
              border="1px solid"
              borderColor="border"
              borderRadius="md"
            >
              <Flex.V gap="2">
                {Array.from({ length: 10 }, (_, i) => (
                  <Text key={i} fontSize="sm">
                    Line {i + 1}
                  </Text>
                ))}
              </Flex.V>
            </ScrollArea>
          </Box>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Chat messages */}
      <ExampleSection title="Use Case: Chat Messages">
        <Box
          width="300px"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box padding="3" borderBottom="1px solid" borderColor="border" bg="bg.subtle">
            <Text fontWeight="semibold">Messages</Text>
          </Box>
          <ScrollArea aria-label="Chat messages" maxHeight="200px" padding="3">
            <Flex.V gap="3">
              {[
                { sender: 'Alice', text: 'Hey, how are you?' },
                { sender: 'You', text: 'I am doing great! Working on a project.' },
                { sender: 'Alice', text: 'That sounds exciting! What kind of project?' },
                { sender: 'You', text: 'A React component library with Chakra UI.' },
                { sender: 'Alice', text: 'Nice! I love Chakra UI. Let me know if you need help.' },
                { sender: 'You', text: 'Thanks! I might take you up on that.' },
                { sender: 'Alice', text: 'Sure thing! Just ping me anytime.' },
              ].map((msg, i) => (
                <Box
                  key={i}
                  padding="2"
                  bg={msg.sender === 'You' ? 'blue.subtle' : 'bg.muted'}
                  borderRadius="md"
                  alignSelf={msg.sender === 'You' ? 'flex-end' : 'flex-start'}
                  maxWidth="80%"
                >
                  <Text fontSize="xs" color="fg.muted" marginBottom="1">
                    {msg.sender}
                  </Text>
                  <Text fontSize="sm">{msg.text}</Text>
                </Box>
              ))}
            </Flex.V>
          </ScrollArea>
        </Box>
      </ExampleSection>

      {/* Use case: Data list */}
      <ExampleSection title="Use Case: Data List">
        <Box
          width="300px"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box padding="3" borderBottom="1px solid" borderColor="border" bg="bg.subtle">
            <Text fontWeight="semibold" fontSize="sm">
              Users (15)
            </Text>
          </Box>
          <ScrollArea aria-label="User list" maxHeight="200px">
            {Array.from({ length: 15 }, (_, i) => (
              <Flex.H
                key={i}
                padding="3"
                borderBottom="1px solid"
                borderColor="border"
                align="center"
                gap="3"
                _hover={{ bg: 'bg.subtle' }}
              >
                <Box
                  width="32px"
                  height="32px"
                  borderRadius="full"
                  bg="blue.subtle"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  U{i + 1}
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="medium">
                    User {i + 1}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    user{i + 1}@email.com
                  </Text>
                </Box>
              </Flex.H>
            ))}
          </ScrollArea>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
