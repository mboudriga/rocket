import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Key } from './Key';

export const KeyExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="2" wrap="wrap">
          <Key>A</Key>
          <Key>B</Key>
          <Key>C</Key>
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Key variant="raised">Raised</Key>
          <Key variant="outline">Outline</Key>
          <Key variant="subtle">Subtle</Key>
          <Key variant="plain">Plain</Key>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Key size="sm">sm</Key>
          <Key size="md">md</Key>
          <Key size="lg">lg</Key>
        </Flex.H>
      </ExampleSection>

      {/* Common keyboard shortcuts */}
      <ExampleSection title="Common Keyboard Shortcuts">
        <Flex.V gap="3">
          <Flex.H gap="1" align="center">
            <Key>Ctrl</Key>
            <Text>+</Text>
            <Key>C</Key>
            <Text marginStart="2">Copy</Text>
          </Flex.H>
          <Flex.H gap="1" align="center">
            <Key>Ctrl</Key>
            <Text>+</Text>
            <Key>V</Key>
            <Text marginStart="2">Paste</Text>
          </Flex.H>
          <Flex.H gap="1" align="center">
            <Key>Ctrl</Key>
            <Text>+</Text>
            <Key>Z</Key>
            <Text marginStart="2">Undo</Text>
          </Flex.H>
          <Flex.H gap="1" align="center">
            <Key>Ctrl</Key>
            <Text>+</Text>
            <Key>S</Key>
            <Text marginStart="2">Save</Text>
          </Flex.H>
        </Flex.V>
      </ExampleSection>

      {/* Special keys */}
      <ExampleSection title="Special Keys">
        <Flex.H gap="2" wrap="wrap">
          <Key>Cmd</Key>
          <Key>Opt</Key>
          <Key>Shift</Key>
          <Key>Ctrl</Key>
          <Key>Enter</Key>
          <Key>Del</Key>
          <Key>Esc</Key>
          <Key>Tab</Key>
        </Flex.H>
      </ExampleSection>

      {/* Arrow keys */}
      <ExampleSection title="Arrow Keys">
        <Flex.H gap="2" wrap="wrap">
          <Key>Up</Key>
          <Key>Down</Key>
          <Key>Left</Key>
          <Key>Right</Key>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Instructions */}
      <ExampleSection title="Use Case: Instructions">
        <Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          width="fit-content"
        >
          <Text marginBottom="3" fontWeight="semibold">
            Navigation Shortcuts
          </Text>
          <Flex.V gap="2">
            <Flex.H gap="2" align="center" justify="space-between" minWidth="200px">
              <Text fontSize="sm">Open search</Text>
              <Flex.H gap="1">
                <Key size="sm">Cmd</Key>
                <Key size="sm">K</Key>
              </Flex.H>
            </Flex.H>
            <Flex.H gap="2" align="center" justify="space-between" minWidth="200px">
              <Text fontSize="sm">Toggle sidebar</Text>
              <Flex.H gap="1">
                <Key size="sm">Cmd</Key>
                <Key size="sm">B</Key>
              </Flex.H>
            </Flex.H>
            <Flex.H gap="2" align="center" justify="space-between" minWidth="200px">
              <Text fontSize="sm">Close modal</Text>
              <Key size="sm">Esc</Key>
            </Flex.H>
          </Flex.V>
        </Box>
      </ExampleSection>

      {/* Use case: Inline */}
      <ExampleSection title="Use Case: Inline Text">
        <Text>
          Press <Key size="sm">Enter</Key> to submit or <Key size="sm">Esc</Key> to cancel.
        </Text>
      </ExampleSection>
    </Flex.V>
  );
};
