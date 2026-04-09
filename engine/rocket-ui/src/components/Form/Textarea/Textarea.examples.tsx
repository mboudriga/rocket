import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Textarea } from './Textarea';

export const TextareaExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <Textarea variant="outline" placeholder="Outline" width="200px" />
          <Textarea variant="subtle" placeholder="Subtle" width="200px" />
          <Textarea variant="flushed" placeholder="Flushed" width="200px" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="start">
          <Textarea size="sm" placeholder="Small" width="150px" />
          <Textarea size="md" placeholder="Medium" width="150px" />
          <Textarea size="lg" placeholder="Large" width="150px" />
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Textarea
          label="Description"
          hint="Max 500 characters"
          placeholder="Enter description..."
          width="350px"
        />
      </ExampleSection>

      {/* Orientation */}
      <ExampleSection title="Orientation">
        <Flex.V gap="4">
          <Textarea
            orientation="vertical"
            label="Vertical (default)"
            placeholder="Enter text"
            width="300px"
          />
          <Textarea
            orientation="horizontal"
            label="Horizontal"
            placeholder="Enter text"
            width="450px"
          />
        </Flex.V>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="3" wrap="wrap">
          <Textarea disabled placeholder="Disabled" width="180px" />
          <Textarea invalid error="Required field" placeholder="Invalid" label="Invalid" width="200px" />
          <Textarea readOnly value="Read only content" label="Read-only" width="180px" />
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
