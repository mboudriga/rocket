import { ExampleSection } from '@components/_examples';
import { Badge } from '@components/Display/Badge';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuBell, LuMail, LuShoppingCart } from 'react-icons/lu';
import { Float } from './Float';
import type { FloatProps } from './Float.types';

export const FloatExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box position="relative" width="100px" height="100px" bg="bg.muted" borderRadius="md">
          <Float placement="top-end">
            <Badge colorPalette="blue">New</Badge>
          </Float>
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="sm" color="fg.muted">
              Content
            </Text>
          </Box>
        </Box>
      </ExampleSection>

      {/* Placements */}
      <ExampleSection title="Placements">
        <Box display="grid" gridTemplateColumns="repeat(3, auto)" gap="6" justifyContent="start">
          {(
            [
              'top-start',
              'top-center',
              'top-end',
              'middle-start',
              'middle-center',
              'middle-end',
              'bottom-start',
              'bottom-center',
              'bottom-end',
            ] as const satisfies Array<FloatProps['placement']>
          ).map((placement) => (
            <Box key={placement}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1" textAlign="center">
                {placement}
              </Text>
              <Box position="relative" width="80px" height="80px" bg="bg.muted" borderRadius="md">
                <Float placement={placement}>
                  <Box width="16px" height="16px" borderRadius="full" bg="blue.solid" />
                </Float>
              </Box>
            </Box>
          ))}
        </Box>
      </ExampleSection>

      {/* Use case: Notification badge */}
      <ExampleSection title="Use Case: Notification Badge">
        <Flex.H gap="6" wrap="wrap">
          <Box position="relative">
            <Box
              width="48px"
              height="48px"
              bg="bg.muted"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="fg.muted"
              fontSize="xl"
            >
              <LuBell />
            </Box>
            <Float placement="top-end">
              <Box
                width="20px"
                height="20px"
                borderRadius="full"
                bg="red.solid"
                color="red.contrast"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                3
              </Box>
            </Float>
          </Box>
          <Box position="relative">
            <Box
              width="48px"
              height="48px"
              bg="bg.muted"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="fg.muted"
              fontSize="xl"
            >
              <LuMail />
            </Box>
            <Float placement="top-end">
              <Box
                width="20px"
                height="20px"
                borderRadius="full"
                bg="green.solid"
                color="green.contrast"
                fontSize="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                12
              </Box>
            </Float>
          </Box>
          <Box position="relative">
            <Box
              width="48px"
              height="48px"
              bg="bg.muted"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="fg.muted"
              fontSize="xl"
            >
              <LuShoppingCart />
            </Box>
            <Float placement="top-end">
              <Box width="8px" height="8px" borderRadius="full" bg="red.solid" />
            </Float>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Product card */}
      <ExampleSection title="Use Case: Product Card">
        <Box
          position="relative"
          width="200px"
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
        >
          <Float placement="top-end">
            <Badge colorPalette="green">Sale</Badge>
          </Float>
          <Box
            height="120px"
            bg="bg.muted"
            borderRadius="md"
            marginBottom="3"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="fg.muted">Product Image</Text>
          </Box>
          <Text fontWeight="semibold">Product Name</Text>
          <Text fontSize="sm" color="fg.muted">
            $29.99
          </Text>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
