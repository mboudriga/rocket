import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Skeleton } from './Skeleton';

export const SkeletonExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Skeleton height="20px" width="200px" />
      </ExampleSection>

      {/* Different shapes */}
      <ExampleSection title="Shapes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Skeleton height="50px" width="50px" />
          <Skeleton height="50px" width="50px" borderRadius="md" />
          <Skeleton.Circle size="50px" />
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="3">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Pulse
            </Text>
            <Skeleton variant="pulse" height="20px" width="200px" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Shine
            </Text>
            <Skeleton variant="shine" height="20px" width="200px" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              None
            </Text>
            <Skeleton variant="none" height="20px" width="200px" />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Text skeleton */}
      <ExampleSection title="Text Skeleton">
        <Box maxWidth="400px">
          <Skeleton.Text noOfLines={3} />
        </Box>
      </ExampleSection>

      {/* Multiple text lines */}
      <ExampleSection title="Multiple Lines">
        <Box maxWidth="400px">
          <Skeleton.Text noOfLines={5} gap="3" />
        </Box>
      </ExampleSection>

      {/* Circle skeleton */}
      <ExampleSection title="Circle Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Skeleton.Circle size="30px" />
          <Skeleton.Circle size="40px" />
          <Skeleton.Circle size="50px" />
          <Skeleton.Circle size="60px" />
          <Skeleton.Circle size="80px" />
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Profile card */}
      <ExampleSection title="Use Case: Profile Card Loading">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" width="300px">
          <Flex.H gap="4">
            <Skeleton.Circle size="60px" />
            <Flex.V gap="2" flex="1">
              <Skeleton height="16px" width="120px" />
              <Skeleton height="12px" width="80px" />
            </Flex.V>
          </Flex.H>
          <Skeleton.Text noOfLines={3} marginTop="4" />
        </Box>
      </ExampleSection>

      {/* Use case: Card list */}
      <ExampleSection title="Use Case: Card List Loading">
        <Flex.V gap="4">
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              padding="4"
              border="1px solid"
              borderColor="border"
              borderRadius="lg"
              width="350px"
            >
              <Flex.H gap="4">
                <Skeleton height="80px" width="80px" borderRadius="md" />
                <Flex.V gap="2" flex="1">
                  <Skeleton height="16px" width="100%" />
                  <Skeleton height="12px" width="60%" />
                  <Skeleton height="12px" width="80%" />
                </Flex.V>
              </Flex.H>
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Use case: Table loading */}
      <ExampleSection title="Use Case: Table Loading">
        <Box
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
          width="500px"
        >
          <Box padding="3" bg="bg.subtle" borderBottom="1px solid" borderColor="border">
            <Flex.H gap="4">
              <Skeleton height="12px" width="100px" />
              <Skeleton height="12px" width="150px" />
              <Skeleton height="12px" width="80px" />
            </Flex.H>
          </Box>
          {[1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              padding="3"
              borderBottom={i < 4 ? '1px solid' : 'none'}
              borderColor="border"
            >
              <Flex.H gap="4">
                <Skeleton height="14px" width="100px" />
                <Skeleton height="14px" width="150px" />
                <Skeleton height="14px" width="80px" />
              </Flex.H>
            </Box>
          ))}
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
