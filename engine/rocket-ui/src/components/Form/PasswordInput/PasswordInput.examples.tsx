import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { PasswordInput } from './PasswordInput';

export const PasswordInputExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <PasswordInput placeholder="Enter password" width="250px" />
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <PasswordInput label="Password" placeholder="Enter password" width="250px" />
          <PasswordInput
            label="Confirm Password"
            hint="Must match your password"
            placeholder="Re-enter password"
            width="280px"
          />
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <PasswordInput variant="outline" placeholder="Outline" width="180px" />
          <PasswordInput variant="subtle" placeholder="Subtle" width="180px" />
          <PasswordInput variant="flushed" placeholder="Flushed" width="180px" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <PasswordInput size="xs" placeholder="xs" width="120px" />
          <PasswordInput size="sm" placeholder="sm" width="120px" />
          <PasswordInput size="md" placeholder="md" width="120px" />
          <PasswordInput size="lg" placeholder="lg" width="120px" />
        </Flex.H>
      </ExampleSection>

      {/* Orientation */}
      <ExampleSection title="Orientation">
        <Flex.V gap="4">
          <PasswordInput
            orientation="vertical"
            label="Vertical (default)"
            placeholder="Enter password"
            width="250px"
          />
          <PasswordInput
            orientation="horizontal"
            label="Horizontal"
            placeholder="Enter password"
            width="400px"
          />
        </Flex.V>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="3" wrap="wrap">
          <PasswordInput disabled placeholder="Disabled" width="180px" />
          <PasswordInput invalid error="Password too weak" placeholder="Invalid" label="Invalid" width="200px" />
          <PasswordInput readOnly value="secretpassword" label="Read-only" width="180px" />
          <PasswordInput required label="Required" placeholder="Password" width="180px" />
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use Case: Login Form */}
      <ExampleSection title="Use Case: Login Form">
        <Flex.V gap="4" maxWidth="sm">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <PasswordInput label="Password" placeholder="Enter your password" />
          <Button colorPalette="blue" width="full">
            Sign in
          </Button>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
