import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Badge } from './Badge';

export const BadgeExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="solid">Solid</Badge>
          <Badge variant="subtle">Subtle</Badge>
          <Badge variant="surface">Surface</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="plain">Plain</Badge>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Badge size="xs">Extra small</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          <Badge colorPalette="blue">Blue</Badge>
          <Badge colorPalette="green">Green</Badge>
          <Badge colorPalette="red">Red</Badge>
          <Badge colorPalette="purple">Purple</Badge>
          <Badge colorPalette="orange">Orange</Badge>
          <Badge colorPalette="teal">Teal</Badge>
          <Badge colorPalette="gray">Gray</Badge>
        </Flex.H>
      </ExampleSection>

      {/* Solid variant with colors */}
      <ExampleSection title="Solid Variant with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="solid" colorPalette="blue">
            Blue
          </Badge>
          <Badge variant="solid" colorPalette="green">
            Green
          </Badge>
          <Badge variant="solid" colorPalette="red">
            Red
          </Badge>
          <Badge variant="solid" colorPalette="purple">
            Purple
          </Badge>
          <Badge variant="solid" colorPalette="orange">
            Orange
          </Badge>
        </Flex.H>
      </ExampleSection>

      {/* Outline variant with colors */}
      <ExampleSection title="Outline Variant with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="outline" colorPalette="blue">
            Blue
          </Badge>
          <Badge variant="outline" colorPalette="green">
            Green
          </Badge>
          <Badge variant="outline" colorPalette="red">
            Red
          </Badge>
          <Badge variant="outline" colorPalette="purple">
            Purple
          </Badge>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Status badges */}
      <ExampleSection title="Use Case: Status Badges">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="subtle" colorPalette="green">
            Active
          </Badge>
          <Badge variant="subtle" colorPalette="yellow">
            Pending
          </Badge>
          <Badge variant="subtle" colorPalette="red">
            Inactive
          </Badge>
          <Badge variant="subtle" colorPalette="blue">
            In Progress
          </Badge>
          <Badge variant="subtle" colorPalette="gray">
            Draft
          </Badge>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Labels */}
      <ExampleSection title="Use Case: Labels">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="solid" colorPalette="red" size="sm">
            New
          </Badge>
          <Badge variant="solid" colorPalette="purple" size="sm">
            Pro
          </Badge>
          <Badge variant="solid" colorPalette="blue" size="sm">
            Beta
          </Badge>
          <Badge variant="outline" colorPalette="orange" size="sm">
            Sale
          </Badge>
        </Flex.H>
      </ExampleSection>

      {/* Use Case: Status Badges */}
      <ExampleSection title="Use Case: Status Badges">
        <Flex.H gap="3" wrap="wrap">
          <Badge variant="solid" colorPalette="green">
            Active
          </Badge>
          <Badge variant="solid" colorPalette="yellow">
            Pending
          </Badge>
          <Badge variant="solid" colorPalette="red">
            Inactive
          </Badge>
          <Badge variant="subtle" colorPalette="blue">
            In Review
          </Badge>
          <Badge variant="outline" colorPalette="gray">
            Draft
          </Badge>
        </Flex.H>
      </ExampleSection>

      {/* Use Case: Labels */}
      <ExampleSection title="Use Case: Labels">
        <Flex.V gap="3">
          <Flex.H gap="2" align="center">
            <Text fontWeight="medium">Feature Request</Text>
            <Badge variant="subtle" colorPalette="purple" size="sm">
              Enhancement
            </Badge>
          </Flex.H>
          <Flex.H gap="2" align="center">
            <Text fontWeight="medium">Login fails on Safari</Text>
            <Badge variant="subtle" colorPalette="red" size="sm">
              Bug
            </Badge>
            <Badge variant="subtle" colorPalette="orange" size="sm">
              High Priority
            </Badge>
          </Flex.H>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
