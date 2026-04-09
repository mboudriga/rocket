import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Tag } from './Tag';

export const TagExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <Tag variant="solid">Solid</Tag>
          <Tag variant="subtle">Subtle</Tag>
          <Tag variant="surface">Surface</Tag>
          <Tag variant="outline">Outline</Tag>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Tag size="sm">Small</Tag>
          <Tag size="md">Medium</Tag>
          <Tag size="lg">Large</Tag>
          <Tag size="xl">Extra Large</Tag>
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          <Tag colorPalette="blue">Blue</Tag>
          <Tag colorPalette="green">Green</Tag>
          <Tag colorPalette="red">Red</Tag>
          <Tag colorPalette="purple">Purple</Tag>
          <Tag colorPalette="orange">Orange</Tag>
          <Tag colorPalette="teal">Teal</Tag>
          <Tag colorPalette="gray">Gray</Tag>
        </Flex.H>
      </ExampleSection>

      {/* With close button */}
      <ExampleSection title="Closable Tags">
        <Flex.H gap="3" wrap="wrap">
          <Tag colorPalette="blue" onClose={() => alert('Closed!')}>
            Closable
          </Tag>
          <Tag
            colorPalette="green"
            onClose={() => {
              /* no-op */
            }}
          >
            React
          </Tag>
          <Tag
            colorPalette="purple"
            onClose={() => {
              /* no-op */
            }}
          >
            TypeScript
          </Tag>
          <Tag
            colorPalette="orange"
            onClose={() => {
              /* no-op */
            }}
          >
            JavaScript
          </Tag>
        </Flex.H>
      </ExampleSection>

      {/* Solid variant with colors */}
      <ExampleSection title="Solid Variant with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Tag variant="solid" colorPalette="blue">
            Blue
          </Tag>
          <Tag variant="solid" colorPalette="green">
            Green
          </Tag>
          <Tag variant="solid" colorPalette="red">
            Red
          </Tag>
          <Tag variant="solid" colorPalette="purple">
            Purple
          </Tag>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Skills */}
      <ExampleSection title="Use Case: Skills">
        <Flex.H gap="2" wrap="wrap">
          <Tag size="sm" colorPalette="blue">
            React
          </Tag>
          <Tag size="sm" colorPalette="blue">
            TypeScript
          </Tag>
          <Tag size="sm" colorPalette="green">
            Node.js
          </Tag>
          <Tag size="sm" colorPalette="purple">
            GraphQL
          </Tag>
          <Tag size="sm" colorPalette="orange">
            AWS
          </Tag>
          <Tag size="sm" colorPalette="teal">
            Docker
          </Tag>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Categories */}
      <ExampleSection title="Use Case: Categories">
        <Flex.H gap="2" wrap="wrap">
          <Tag variant="outline" colorPalette="blue">
            Technology
          </Tag>
          <Tag variant="outline" colorPalette="green">
            Health
          </Tag>
          <Tag variant="outline" colorPalette="purple">
            Design
          </Tag>
          <Tag variant="outline" colorPalette="orange">
            Business
          </Tag>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
