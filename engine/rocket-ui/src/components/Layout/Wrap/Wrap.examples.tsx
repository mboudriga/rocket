import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Wrap } from './Wrap';

export const WrapExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Wrap gap="3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Box key={i} padding="3" bg="blue.subtle" borderRadius="md">
              <Text>Item {i}</Text>
            </Box>
          ))}
        </Wrap>
      </ExampleSection>

      {/* Gap sizes */}
      <ExampleSection title="Gap Sizes">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              gap="2"
            </Text>
            <Wrap gap="2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Box key={i} padding="2" bg="green.subtle" borderRadius="md">
                  <Text fontSize="sm">Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              gap="4"
            </Text>
            <Wrap gap="4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Box key={i} padding="2" bg="green.subtle" borderRadius="md">
                  <Text fontSize="sm">Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              gap="6"
            </Text>
            <Wrap gap="6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Box key={i} padding="2" bg="green.subtle" borderRadius="md">
                  <Text fontSize="sm">Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Alignment */}
      <ExampleSection title="Alignment">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="start"
            </Text>
            <Wrap gap="3" justify="start">
              {[1, 2, 3].map((i) => (
                <Box key={i} padding="3" bg="purple.subtle" borderRadius="md">
                  <Text>Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="center"
            </Text>
            <Wrap gap="3" justify="center">
              {[1, 2, 3].map((i) => (
                <Box key={i} padding="3" bg="purple.subtle" borderRadius="md">
                  <Text>Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              justify="end"
            </Text>
            <Wrap gap="3" justify="end">
              {[1, 2, 3].map((i) => (
                <Box key={i} padding="3" bg="purple.subtle" borderRadius="md">
                  <Text>Item {i}</Text>
                </Box>
              ))}
            </Wrap>
          </Box>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
