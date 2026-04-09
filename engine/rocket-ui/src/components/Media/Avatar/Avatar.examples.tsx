import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Avatar } from './Avatar';

export const AvatarExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="4" align="center">
          <Avatar name="John Doe" />
          <Avatar src="https://i.pravatar.cc/150?u=john" name="John Doe" />
          <Avatar name="Jane Smith" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" align="center">
          <Avatar size="2xs" name="2XS" />
          <Avatar size="xs" name="XS" />
          <Avatar size="sm" name="SM" />
          <Avatar size="md" name="MD" />
          <Avatar size="lg" name="LG" />
          <Avatar size="xl" name="XL" />
          <Avatar size="2xl" name="2XL" />
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" align="center">
          {(['solid', 'subtle', 'outline'] as const).map((variant) => (
            <Box key={variant} textAlign="center">
              <Avatar variant={variant} name="John Doe" colorPalette="blue" />
              <Text fontSize="xs" color="fg.muted" marginTop="1">
                {variant}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Shapes */}
      <ExampleSection title="Shapes">
        <Flex.H gap="4" align="center">
          {(['full', 'rounded', 'square'] as const).map((shape) => (
            <Box key={shape} textAlign="center">
              <Avatar shape={shape} name="John Doe" colorPalette="purple" />
              <Text fontSize="xs" color="fg.muted" marginTop="1">
                {shape}
              </Text>
            </Box>
          ))}
        </Flex.H>
      </ExampleSection>

      {/* Color palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          {['gray', 'blue', 'green', 'red', 'purple', 'orange', 'teal', 'pink'].map((color) => (
            <Avatar
              key={color}
              colorPalette={
                color as 'gray' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'teal' | 'pink'
              }
              name={color.charAt(0).toUpperCase()}
              size="md"
            />
          ))}
        </Flex.H>
      </ExampleSection>

      {/* With image */}
      <ExampleSection title="With Images">
        <Flex.H gap="4" align="center">
          <Avatar src="https://i.pravatar.cc/150?u=alice" name="Alice Brown" size="lg" />
          <Avatar src="https://i.pravatar.cc/150?u=bob" name="Bob Wilson" size="lg" />
          <Avatar src="https://i.pravatar.cc/150?u=carol" name="Carol Davis" size="lg" />
          <Avatar
            src="https://i.pravatar.cc/150?u=invalid-url-fallback"
            name="Fallback"
            size="lg"
          />
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: User profile */}
      <ExampleSection title="Use Case: User Profile">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Flex.H gap="4" align="center">
            <Avatar src="https://i.pravatar.cc/150?u=profile" name="Sarah Johnson" size="xl" />
            <Flex.V gap="1">
              <Text fontWeight="semibold">Sarah Johnson</Text>
              <Text fontSize="sm" color="fg.muted">
                Product Designer
              </Text>
              <Text fontSize="xs" color="fg.muted">
                San Francisco, CA
              </Text>
            </Flex.V>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Avatar group */}
      <ExampleSection title="Use Case: Team Members">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Text fontSize="sm" fontWeight="medium" marginBottom="2">
            Project Team
          </Text>
          <Flex.H>
            {['Alice', 'Bob', 'Carol', 'David', 'Emma'].map((name, index) => (
              <Box
                key={name}
                marginLeft={index > 0 ? '-3' : '0'}
                borderWidth="2px"
                borderColor="bg"
                borderRadius="full"
              >
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${name.toLowerCase()}`}
                  name={name}
                  size="md"
                />
              </Box>
            ))}
            <Box marginLeft="-3" borderWidth="2px" borderColor="bg" borderRadius="full">
              <Avatar name="+5" colorPalette="gray" size="md" />
            </Box>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Comment */}
      <ExampleSection title="Use Case: Comment">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Flex.H gap="3" align="start">
            <Avatar src="https://i.pravatar.cc/150?u=commenter" name="Mike Chen" size="sm" />
            <Flex.V gap="1" flex="1">
              <Flex.H gap="2" align="baseline">
                <Text fontSize="sm" fontWeight="medium">
                  Mike Chen
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  2 hours ago
                </Text>
              </Flex.H>
              <Text fontSize="sm" color="fg.muted">
                This looks great! The design really captures the essence of what we discussed.
              </Text>
            </Flex.V>
          </Flex.H>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
