import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { NumberInput } from './NumberInput';

export const NumberInputExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <NumberInput label="Basic" width="150px" defaultValue="0" />
      </ExampleSection>

      {/* With min/max */}
      <ExampleSection title="With Min/Max">
        <Flex.H gap="4" wrap="wrap">
          <NumberInput label="Range 0–100" width="150px" min={0} max={100} defaultValue="50" />
          <NumberInput label="Range -10–10" width="150px" min={-10} max={10} defaultValue="0" />
        </Flex.H>
      </ExampleSection>

      {/* With step */}
      <ExampleSection title="With Step">
        <Flex.H gap="4" wrap="wrap">
          <NumberInput label="Step 5" width="150px" step={5} defaultValue="0" />
          <NumberInput label="Step 0.1" width="150px" step={0.1} defaultValue="0" />
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <NumberInput label="Quantity" width="150px" defaultValue="1" />
          <NumberInput label="Price" hint="Enter price in USD" width="180px" defaultValue="99" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <NumberInput label="XS" size="xs" width="120px" defaultValue="0" />
          <NumberInput label="SM" size="sm" width="120px" defaultValue="0" />
          <NumberInput label="MD" size="md" width="120px" defaultValue="0" />
          <NumberInput label="LG" size="lg" width="120px" defaultValue="0" />
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <NumberInput label="Disabled" disabled width="150px" defaultValue="10" />
          <NumberInput label="Invalid" invalid error="Invalid value" width="180px" />
          <NumberInput label="Read Only" readOnly width="150px" value="42" />
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
