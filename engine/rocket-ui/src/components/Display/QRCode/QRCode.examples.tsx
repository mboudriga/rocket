import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { QRCode } from './QRCode';

export const QRCodeExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <QRCode value="https://example.com" />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="6" wrap="wrap" align="end">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              xs
            </Text>
            <QRCode size="xs" value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              sm
            </Text>
            <QRCode size="sm" value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              md
            </Text>
            <QRCode size="md" value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              lg
            </Text>
            <QRCode size="lg" value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              xl
            </Text>
            <QRCode size="xl" value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              2xl
            </Text>
            <QRCode size="2xl" value="https://example.com" />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Different content types */}
      <ExampleSection title="Different Content Types">
        <Flex.H gap="6" wrap="wrap">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              URL
            </Text>
            <QRCode value="https://example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Text
            </Text>
            <QRCode value="Hello, World!" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Email
            </Text>
            <QRCode value="mailto:hello@example.com" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Phone
            </Text>
            <QRCode value="tel:+1234567890" />
          </Box>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Share link */}
      <ExampleSection title="Use Case: Share Link">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.V align="center" gap="4">
            <QRCode size="lg" value="https://example.com/share/abc123" />
            <Text fontWeight="semibold">Scan to open</Text>
            <Text fontSize="sm" color="fg.muted">
              Or copy link: example.com/share/abc123
            </Text>
          </Flex.V>
        </Box>
      </ExampleSection>

      {/* Use case: Payment */}
      <ExampleSection title="Use Case: Payment">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.V align="center" gap="4">
            <Text fontWeight="semibold">Pay with QR Code</Text>
            <Box padding="4" bg="bg" border="2px solid" borderColor="blue.solid" borderRadius="lg">
              <QRCode size="lg" value="payment://example.com/pay/order-12345" />
            </Box>
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="bold">
                $45.00
              </Text>
              <Text fontSize="sm" color="fg.muted">
                Order #12345
              </Text>
            </Box>
          </Flex.V>
        </Box>
      </ExampleSection>

      {/* Use case: App download */}
      <ExampleSection title="Use Case: App Download">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.H gap="6" align="center">
            <QRCode size="lg" value="https://apps.example.com/download" />
            <Flex.V gap="2">
              <Text fontWeight="semibold">Download Our App</Text>
              <Text fontSize="sm" color="fg.muted">
                Scan the QR code with your phone
              </Text>
              <Text fontSize="xs" color="fg.muted">
                Available for iOS and Android
              </Text>
            </Flex.V>
          </Flex.H>
        </Box>
      </ExampleSection>

      {/* Use case: Contact card */}
      <ExampleSection title="Use Case: Contact Card">
        <Box
          padding="5"
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          width="fit-content"
        >
          <Flex.H gap="5">
            <QRCode value="BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEMAIL:john@example.com\nEND:VCARD" />
            <Flex.V gap="1">
              <Text fontWeight="semibold">John Doe</Text>
              <Text fontSize="sm" color="fg.muted">
                Software Engineer
              </Text>
              <Text fontSize="sm" color="fg.muted">
                john@example.com
              </Text>
              <Text fontSize="sm" color="fg.muted">
                +1 (234) 567-890
              </Text>
              <Text fontSize="xs" color="fg.muted" marginTop="2">
                Scan to save contact
              </Text>
            </Flex.V>
          </Flex.H>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
