import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Spinner } from './Spinner';

export const SpinnerExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Spinner />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="6" wrap="wrap" align="center">
          <Flex.V align="center" gap="1">
            <Spinner size="xs" />
            <Text fontSize="xs" color="fg.muted">
              xs
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <Spinner size="sm" />
            <Text fontSize="xs" color="fg.muted">
              sm
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <Spinner size="md" />
            <Text fontSize="xs" color="fg.muted">
              md
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <Spinner size="lg" />
            <Text fontSize="xs" color="fg.muted">
              lg
            </Text>
          </Flex.V>
          <Flex.V align="center" gap="1">
            <Spinner size="xl" />
            <Text fontSize="xs" color="fg.muted">
              xl
            </Text>
          </Flex.V>
        </Flex.H>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.H gap="4" wrap="wrap">
          <Spinner colorPalette="blue" />
          <Spinner colorPalette="green" />
          <Spinner colorPalette="red" />
          <Spinner colorPalette="purple" />
          <Spinner colorPalette="orange" />
          <Spinner colorPalette="teal" />
        </Flex.H>
      </ExampleSection>

      {/* With label */}
      <ExampleSection title="With Label">
        <Flex.H gap="2" align="center">
          <Spinner size="sm" />
          <Text>Loading...</Text>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Section loading */}
      <ExampleSection title="Use Case: Section Loading">
        <Box
          position="relative"
          width="300px"
          height="150px"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex.V
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            align="center"
            justify="center"
            bg="bg/70"
          >
            <Spinner size="lg" colorPalette="blue" />
          </Flex.V>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
