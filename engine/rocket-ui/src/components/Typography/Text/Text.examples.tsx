import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Text } from './Text';

export const TextExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Text>
          This is a basic text component. It renders as a paragraph by default and can be styled
          with various props.
        </Text>
      </ExampleSection>

      {/* Font sizes */}
      <ExampleSection title="Font Sizes">
        <Flex.V gap="2">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
            <Text key={size} fontSize={size}>
              Font size: {size}
            </Text>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Font weights */}
      <ExampleSection title="Font Weights">
        <Flex.V gap="2">
          {(['light', 'normal', 'medium', 'semibold', 'bold'] as const).map((weight) => (
            <Text key={weight} fontWeight={weight}>
              Font weight: {weight}
            </Text>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Colors */}
      <ExampleSection title="Colors">
        <Flex.V gap="2">
          <Text color="fg">Default text color (fg)</Text>
          <Text color="fg.muted">Muted text (fg.muted)</Text>
          <Text color="blue.fg">Blue text (blue.fg)</Text>
          <Text color="green.fg">Green text (green.fg)</Text>
          <Text color="red.fg">Red text (red.fg)</Text>
          <Text color="purple.fg">Purple text (purple.fg)</Text>
        </Flex.V>
      </ExampleSection>

      {/* Text alignment */}
      <ExampleSection title="Text Alignment">
        <Flex.V gap="2">
          <Text textAlign="left" bg="bg.subtle" padding="2" borderRadius="md">
            Left aligned text
          </Text>
          <Text textAlign="center" bg="bg.subtle" padding="2" borderRadius="md">
            Center aligned text
          </Text>
          <Text textAlign="right" bg="bg.subtle" padding="2" borderRadius="md">
            Right aligned text
          </Text>
        </Flex.V>
      </ExampleSection>

      {/* Line clamp (truncation) */}
      <ExampleSection title="Line Clamp (Truncation)">
        <Flex.V gap="4">
          <Box
            maxWidth="300px"
            border="1px solid"
            borderColor="border"
            borderRadius="md"
            padding="3"
          >
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              lineClamp={1}
            </Text>
            <Text lineClamp={1}>
              This is a long text that will be truncated to a single line with an ellipsis at the
              end because we set lineClamp to 1.
            </Text>
          </Box>
          <Box
            maxWidth="300px"
            border="1px solid"
            borderColor="border"
            borderRadius="md"
            padding="3"
          >
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              lineClamp={2}
            </Text>
            <Text lineClamp={2}>
              This is a long text that will be truncated to two lines with an ellipsis at the end.
              It allows for more content to be shown while still keeping the layout consistent.
            </Text>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With highlight */}
      <ExampleSection title="With Highlight">
        <Flex.V gap="3">
          <Text highlight={{ query: 'highlighted', styles: { bg: 'yellow.subtle', px: '1' } }}>
            This text contains a highlighted word.
          </Text>
          <Text
            highlight={{
              query: 'important',
              styles: { bg: 'red.subtle', color: 'red.fg', px: '1' },
            }}
          >
            This is an important message that needs attention.
          </Text>
          <Text
            highlight={{ query: ['React', 'TypeScript'], styles: { bg: 'blue.subtle', px: '1' } }}
          >
            Learn React and TypeScript to build modern applications.
          </Text>
        </Flex.V>
      </ExampleSection>

      {/* With tooltip */}
      <ExampleSection title="With Tooltip">
        <Flex.H gap="4" wrap="wrap">
          <Text
            tooltip="This is additional information"
            textDecoration="underline"
            textDecorationStyle="dotted"
            cursor="help"
          >
            Hover for more info
          </Text>
          <Text
            tooltip="API = Application Programming Interface"
            textDecoration="underline"
            textDecorationStyle="dotted"
            cursor="help"
          >
            What is an API?
          </Text>
        </Flex.H>
      </ExampleSection>

      {/* Text decoration */}
      <ExampleSection title="Text Decoration">
        <Flex.H gap="4" wrap="wrap">
          <Text textDecoration="underline">Underlined</Text>
          <Text textDecoration="line-through">Strikethrough</Text>
          <Text fontStyle="italic">Italic</Text>
          <Text as="sup">Superscript</Text>
          <Text as="sub">Subscript</Text>
        </Flex.H>
      </ExampleSection>

      {/* As different elements */}
      <ExampleSection title="As Different Elements">
        <Flex.V gap="2">
          <Text as="p">Paragraph (default)</Text>
          <Text as="span" display="inline">
            Inline span
          </Text>
          <Text as="label" fontWeight="medium">
            Form label
          </Text>
          <Text as="cite" fontStyle="italic">
            Citation
          </Text>
          <Text as="mark" bg="yellow.subtle">
            Marked/highlighted
          </Text>
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use case: Article paragraph */}
      <ExampleSection title="Use Case: Article Content">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4" maxWidth="500px">
          <Text fontSize="lg" fontWeight="semibold" marginBottom="3">
            Getting Started with React
          </Text>
          <Text color="fg" marginBottom="3" lineHeight="tall">
            React is a JavaScript library for building user interfaces. It lets you create reusable
            UI components that manage their own state, then compose them to make complex UIs.
          </Text>
          <Text color="fg.muted" fontSize="sm" lineHeight="tall">
            Whether you&apos;re building a simple component or a full-scale application,
            React&apos;s component-based architecture makes it easy to build and maintain your code
            over time.
          </Text>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
