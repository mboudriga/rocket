import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCopy, LuLink } from 'react-icons/lu';
import { Clipboard } from './Clipboard';

export const ClipboardExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Clipboard value="Text to copy" />
      </ExampleSection>

      {/* Different values */}
      <ExampleSection title="Different Values">
        <Flex.H gap="3" wrap="wrap">
          <Clipboard value="Hello, World!" />
          <Clipboard value="npm install my-package" />
          <Clipboard value="https://example.com" />
        </Flex.H>
      </ExampleSection>

      {/* Custom trigger */}
      <ExampleSection title="Custom Trigger">
        <Flex.H gap="3" wrap="wrap">
          <Clipboard value="Copy me!">
            <Button variant="outline" size="sm">
              <LuCopy />
              Copy Text
            </Button>
          </Clipboard>
          <Clipboard value="https://example.com/share/abc123">
            <Button colorPalette="blue" size="sm">
              <LuLink />
              Copy Link
            </Button>
          </Clipboard>
        </Flex.H>
      </ExampleSection>

      {/* With custom timeout */}
      <ExampleSection title="Custom Timeout (5 seconds)">
        <Clipboard value="This stays copied for 5 seconds" timeout={5000} />
      </ExampleSection>

      <Divider />

      {/* Use case: Share link */}
      <ExampleSection title="Use Case: Share Link">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="450px">
          <Text fontWeight="semibold" marginBottom="3">
            Share this link
          </Text>
          <Flex.H gap="2">
            <Input value="https://example.com/share/abc123" readOnly size="sm" aria-label="Share link" />
            <Clipboard value="https://example.com/share/abc123">
              <Button size="sm" colorPalette="blue">
                Copy
              </Button>
            </Clipboard>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: API key */}
      <ExampleSection title="Use Case: API Key">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="500px">
          <Flex.H justify="space-between" align="center" marginBottom="2">
            <Text fontWeight="semibold">API Key</Text>
            <Clipboard value="sk-1234567890abcdefghijklmnop">
              <Button variant="ghost" size="sm">
                <LuCopy />
                Copy
              </Button>
            </Clipboard>
          </Flex.H>
          <Box padding="3" bg="bg.subtle" borderRadius="md" fontFamily="mono" fontSize="sm">
            sk-1234567890abcdefghijklmnop
          </Box>
          <Text fontSize="xs" color="fg.muted" marginTop="2">
            Keep this key secure and do not share it publicly.
          </Text>
        </Box>
      </ExampleSection>

      {/* Use case: Install command */}
      <ExampleSection title="Use Case: Install Command">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="450px">
          <Text fontWeight="semibold" marginBottom="3">
            Installation
          </Text>
          <Flex.V gap="2">
            <Flex.H gap="2" align="center">
              <Box
                flex="1"
                padding="2"
                bg="gray.solid"
                borderRadius="md"
                fontFamily="mono"
                fontSize="sm"
                color="gray.contrast"
              >
                pnpm install @rocket/ui
              </Box>
              <Clipboard value="pnpm install @rocket/ui">
                <Button size="sm" variant="outline">
                  <LuCopy />
                </Button>
              </Clipboard>
            </Flex.H>
          </Flex.V>
        </Box>
      </ExampleSection>

      {/* Use case: Color value */}
      <ExampleSection title="Use Case: Color Value">
        <Box
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.H gap="4">
            {[
              { color: '#3B82F6', name: 'Blue' },
              { color: '#10B981', name: 'Green' },
              { color: '#EF4444', name: 'Red' },
              { color: '#8B5CF6', name: 'Purple' },
            ].map(({ color, name }) => (
              <Clipboard key={color} value={color}>
                <Box cursor="pointer" textAlign="center" role="button" tabIndex={0}>
                  <Box width="50px" height="50px" bg={color} borderRadius="md" marginBottom="1" />
                  <Text fontSize="xs" color="fg.muted">
                    {name}
                  </Text>
                  <Text fontSize="xs" fontFamily="mono">
                    {color}
                  </Text>
                </Box>
              </Clipboard>
            ))}
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Reference number */}
      <ExampleSection title="Use Case: Reference Number">
        <Box padding="4" border="1px solid" borderColor="border" borderRadius="lg" maxWidth="400px">
          <Flex.H justify="space-between" align="center">
            <Box>
              <Text fontSize="sm" color="fg.muted">
                Order Reference
              </Text>
              <Text fontWeight="semibold" fontFamily="mono">
                ORD-2024-001234
              </Text>
            </Box>
            <Clipboard value="ORD-2024-001234" />
          </Flex.H>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
