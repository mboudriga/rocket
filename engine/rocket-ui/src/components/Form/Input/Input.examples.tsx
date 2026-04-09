import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Input } from './Input';

export const InputExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <Input variant="outline" placeholder="Outline" width="180px" />
          <Input variant="subtle" placeholder="Subtle" width="180px" />
          <Input variant="flushed" placeholder="Flushed" width="180px" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Input size="xs" placeholder="xs" width="100px" />
          <Input size="sm" placeholder="sm" width="100px" />
          <Input size="md" placeholder="md" width="100px" />
          <Input size="lg" placeholder="lg" width="100px" />
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <Input
            label="Email"
            hint="We'll keep this private"
            placeholder="you@example.com"
            width="250px"
          />
          <Input label="Username" placeholder="Enter username" width="200px" />
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="3" wrap="wrap">
          <Input label="Disabled" disabled placeholder="Disabled" width="150px" />
          <Input label="Invalid" invalid error="This field is required" placeholder="Invalid" width="200px" />
          <Input label="Read Only" readOnly value="Read only" width="150px" />
          <Input required label="Required" placeholder="Required field" width="180px" />
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
