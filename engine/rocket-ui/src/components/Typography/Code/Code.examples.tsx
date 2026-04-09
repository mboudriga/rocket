import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Code } from './Code';

export const CodeExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Text>
          Use the <Code>console.log()</Code> function to debug.
        </Text>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Code variant="solid">solid</Code>
          <Code variant="subtle">subtle</Code>
          <Code variant="surface">surface</Code>
          <Code variant="outline">outline</Code>
          <Code variant="plain">plain</Code>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Code size="xs">xs size</Code>
          <Code size="sm">sm size</Code>
          <Code size="md">md size</Code>
          <Code size="lg">lg size</Code>
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          <Code colorPalette="gray">gray</Code>
          <Code colorPalette="blue">blue</Code>
          <Code colorPalette="green">green</Code>
          <Code colorPalette="red">red</Code>
          <Code colorPalette="purple">purple</Code>
          <Code colorPalette="orange">orange</Code>
        </Flex.H>
      </ExampleSection>

      {/* Solid variant with colors */}
      <ExampleSection title="Solid Variant with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Code variant="solid" colorPalette="blue">
            npm install
          </Code>
          <Code variant="solid" colorPalette="green">
            npm start
          </Code>
          <Code variant="solid" colorPalette="red">
            npm run build
          </Code>
          <Code variant="solid" colorPalette="purple">
            npm test
          </Code>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Inline code */}
      <ExampleSection title="Use Case: Inline Code">
        <Text>
          The <Code>useState</Code> hook lets you add state to functional components. Call{' '}
          <Code>setCount(count + 1)</Code> to update the state.
        </Text>
      </ExampleSection>

      {/* Use case: Commands */}
      <ExampleSection title="Use Case: Terminal Commands">
        <Flex.V gap="2">
          <Text fontSize="sm">
            Install dependencies: <Code colorPalette="green">npm install</Code>
          </Text>
          <Text fontSize="sm">
            Start development server: <Code colorPalette="blue">npm run dev</Code>
          </Text>
          <Text fontSize="sm">
            Build for production: <Code colorPalette="orange">npm run build</Code>
          </Text>
        </Flex.V>
      </ExampleSection>

      {/* Use case: File paths */}
      <ExampleSection title="Use Case: File Paths">
        <Text fontSize="sm">
          Configuration file is located at <Code>src/config/index.ts</Code>
        </Text>
      </ExampleSection>
    </Flex.V>
  );
};
