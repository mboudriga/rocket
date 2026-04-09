import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { ColorSwatch } from './ColorSwatch';

const PALETTES = [
  'gray',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
] as const;
const SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
] as const;

export const ColorSwatchExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="3" wrap="wrap">
          <ColorSwatch value="gray.solid" />
          <ColorSwatch value="red.solid" />
          <ColorSwatch value="orange.solid" />
          <ColorSwatch value="yellow.solid" />
          <ColorSwatch value="green.solid" />
          <ColorSwatch value="teal.solid" />
          <ColorSwatch value="blue.solid" />
          <ColorSwatch value="cyan.solid" />
          <ColorSwatch value="purple.solid" />
          <ColorSwatch value="pink.solid" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <ColorSwatch size="xs" value="blue.500" />
          <ColorSwatch size="sm" value="blue.500" />
          <ColorSwatch size="md" value="blue.500" />
          <ColorSwatch size="lg" value="blue.500" />
          <ColorSwatch size="xl" value="blue.500" />
          <ColorSwatch size="2xl" value="blue.500" />
        </Flex.H>
      </ExampleSection>

      {/* Color palette */}
      <ExampleSection title="Color Shades">
        <Flex.V gap="3">
          {PALETTES.map((palette) => (
            <Flex.H key={palette} gap="1">
              {SHADES.map((shade) => (
                <ColorSwatch key={`${palette}.${shade}`} value={`${palette}.${shade}`} />
              ))}
            </Flex.H>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Hex colors */}
      <ExampleSection title="Hex Colors">
        <Flex.H gap="3" wrap="wrap">
          <ColorSwatch value="#1a73e8" />
          <ColorSwatch value="#0078d4" />
          <ColorSwatch value="#ff6900" />
          <ColorSwatch value="#1db954" />
          <ColorSwatch value="#e50914" />
          <ColorSwatch value="#ff0000" />
          <ColorSwatch value="#6441a5" />
          <ColorSwatch value="#1877f2" />
          <ColorSwatch value="#ff4500" />
          <ColorSwatch value="#00acee" />
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Color picker preview */}
      <ExampleSection title="Use Case: Color Selection">
        <Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Text fontWeight="semibold" marginBottom="3">
            Choose a color
          </Text>
          <Flex.H gap="2" wrap="wrap">
            {[
              'red.500',
              'orange.500',
              'yellow.500',
              'green.500',
              'teal.500',
              'blue.500',
              'cyan.500',
              'purple.500',
              'pink.500',
            ].map((color) => (
              <ColorSwatch
                key={color}
                value={color}
                size="lg"
                cursor="pointer"
                borderRadius="md"
                _hover={{ transform: 'scale(1.1)' }}
                transition="transform 0.2s"
              />
            ))}
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Theme colors */}
      <ExampleSection title="Use Case: Theme Colors">
        <Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Text fontWeight="semibold" marginBottom="3">
            Brand Colors
          </Text>
          <Flex.V gap="3">
            <Flex.H gap="3" align="center">
              <ColorSwatch value="blue.solid" size="lg" />
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Primary
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  blue.solid
                </Text>
              </Box>
            </Flex.H>
            <Flex.H gap="3" align="center">
              <ColorSwatch value="green.solid" size="lg" />
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Success
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  green.solid
                </Text>
              </Box>
            </Flex.H>
            <Flex.H gap="3" align="center">
              <ColorSwatch value="red.solid" size="lg" />
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Error
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  red.solid
                </Text>
              </Box>
            </Flex.H>
            <Flex.H gap="3" align="center">
              <ColorSwatch value="orange.solid" size="lg" />
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Warning
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  orange.solid
                </Text>
              </Box>
            </Flex.H>
          </Flex.V>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
