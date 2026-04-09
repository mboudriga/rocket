import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { PinInput } from './PinInput';

export const PinInputExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic (4 digits)">
        <PinInput />
      </ExampleSection>

      {/* Different lengths */}
      <ExampleSection title="Different Lengths">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              4 digits
            </Text>
            <PinInput length={4} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              6 digits
            </Text>
            <PinInput length={6} />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              8 digits
            </Text>
            <PinInput length={8} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Small
            </Text>
            <PinInput size="sm" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Medium
            </Text>
            <PinInput size="md" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Large
            </Text>
            <PinInput size="lg" />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* One-time code */}
      <ExampleSection title="One-Time Code (OTP)">
        <PinInput otp length={6} />
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Disabled
            </Text>
            <PinInput disabled />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Invalid
            </Text>
            <PinInput invalid />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With placeholder */}
      <ExampleSection title="With Placeholder">
        <PinInput placeholder="○" />
      </ExampleSection>

      <Divider />

      {/* Use Case: OTP Verification */}
      <ExampleSection title="Use Case: OTP Verification">
        <Flex.V gap="4" align="center" maxWidth="sm">
          <Text fontWeight="semibold">Enter verification code</Text>
          <Text fontSize="sm" color="fg.muted">
            We sent a 6-digit code to your email
          </Text>
          <PinInput length={6} placeholder="○" />
          <Button colorPalette="blue" width="full">
            Verify
          </Button>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
