import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCheck, LuHeart, LuStar } from 'react-icons/lu';
import { Center } from './Center';

export const CenterExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Center height="100px" bg="bg.muted" borderRadius="md">
          <Text>Centered content</Text>
        </Center>
      </ExampleSection>

      {/* With different sizes */}
      <ExampleSection title="With Different Sizes">
        <Flex.H gap="4" wrap="wrap">
          <Center width="80px" height="80px" bg="blue.subtle" borderRadius="md">
            <Text fontSize="sm">80x80</Text>
          </Center>
          <Center width="100px" height="100px" bg="green.subtle" borderRadius="md">
            <Text fontSize="sm">100x100</Text>
          </Center>
          <Center width="120px" height="120px" bg="purple.subtle" borderRadius="md">
            <Text fontSize="sm">120x120</Text>
          </Center>
        </Flex.H>
      </ExampleSection>

      {/* Centering icons */}
      <ExampleSection title="Centering Icons">
        <Flex.H gap="4" wrap="wrap">
          <Center width="48px" height="48px" bg="yellow.subtle" borderRadius="full">
            <LuStar size={24} />
          </Center>
          <Center width="48px" height="48px" bg="red.subtle" borderRadius="full">
            <LuHeart size={24} />
          </Center>
          <Center width="48px" height="48px" bg="green.subtle" borderRadius="full">
            <LuCheck size={24} />
          </Center>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Loading placeholder */}
      <ExampleSection title="Use Case: Loading Placeholder">
        <Center
          height="200px"
          bg="bg.subtle"
          border="2px dashed"
          borderColor="border"
          borderRadius="lg"
        >
          <Flex.V gap="2" align="center">
            <Box
              width="40px"
              height="40px"
              borderRadius="full"
              border="3px solid"
              borderColor="blue.solid"
              borderTopColor="transparent"
              animation="spin 1s linear infinite"
            />
            <Text color="fg.muted">Loading...</Text>
          </Flex.V>
        </Center>
      </ExampleSection>
    </Flex.V>
  );
};
