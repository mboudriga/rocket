import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCheck, LuHeart, LuStar, LuUser, LuX } from 'react-icons/lu';
import { Circle } from './Circle';

export const CircleExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="4" wrap="wrap">
          <Circle size="40px" bg="bg.muted">
            <Text>A</Text>
          </Circle>
          <Circle size="40px" bg="blue.subtle">
            <Text>B</Text>
          </Circle>
          <Circle size="40px" bg="green.subtle">
            <Text>C</Text>
          </Circle>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Box textAlign="center">
            <Circle size="24px" bg="purple.subtle">
              <Text fontSize="xs">S</Text>
            </Circle>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              24px
            </Text>
          </Box>
          <Box textAlign="center">
            <Circle size="32px" bg="purple.subtle">
              <Text fontSize="sm">M</Text>
            </Circle>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              32px
            </Text>
          </Box>
          <Box textAlign="center">
            <Circle size="40px" bg="purple.subtle">
              <Text>L</Text>
            </Circle>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              40px
            </Text>
          </Box>
          <Box textAlign="center">
            <Circle size="48px" bg="purple.subtle">
              <Text>XL</Text>
            </Circle>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              48px
            </Text>
          </Box>
          <Box textAlign="center">
            <Circle size="64px" bg="purple.subtle">
              <Text fontSize="lg">2X</Text>
            </Circle>
            <Text fontSize="xs" color="fg.muted" marginTop="1">
              64px
            </Text>
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <Flex.H gap="4" wrap="wrap">
          <Circle size="40px" bg="blue.solid" color="blue.contrast">
            <LuUser size={20} />
          </Circle>
          <Circle size="40px" bg="green.solid" color="green.contrast">
            <LuCheck size={20} />
          </Circle>
          <Circle size="40px" bg="red.solid" color="red.contrast">
            <LuX size={20} />
          </Circle>
          <Circle size="40px" bg="yellow.solid" color="yellow.contrast">
            <LuStar size={20} />
          </Circle>
          <Circle size="40px" bg="pink.solid" color="pink.contrast">
            <LuHeart size={20} />
          </Circle>
        </Flex.H>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.H gap="3" wrap="wrap">
          {['blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink', 'cyan'].map((color) => (
            <Circle key={color} size="40px" bg={`${color}.solid`} color={`${color}.contrast`}>
              <Text fontSize="sm" textTransform="uppercase" color="inherit">
                {color[0]}
              </Text>
            </Circle>
          ))}
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Status indicators */}
      <ExampleSection title="Use Case: Status Indicators">
        <Flex.H gap="6" wrap="wrap">
          {[
            { status: 'Online', bg: 'green.solid' },
            { status: 'Away', bg: 'yellow.solid' },
            { status: 'Busy', bg: 'red.solid' },
            { status: 'Offline', bg: 'gray.solid' },
          ].map((item) => (
            <Flex.H key={item.status} align="center" gap="2">
              <Circle size="12px" bg={item.bg} />
              <Text fontSize="sm">{item.status}</Text>
            </Flex.H>
          ))}
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
