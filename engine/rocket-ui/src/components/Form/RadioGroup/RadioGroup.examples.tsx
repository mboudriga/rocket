import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const RadioGroupExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <RadioGroup label="Basic" options={options} defaultValue="option1" />
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="8" wrap="wrap">
          <RadioGroup label="Outline" variant="outline" options={options} defaultValue="option1" />
          <RadioGroup label="Solid" variant="solid" options={options} defaultValue="option1" />
          <RadioGroup label="Subtle" variant="subtle" options={options} defaultValue="option1" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="8" wrap="wrap" align="start">
          <RadioGroup label="Extra Small" size="xs" options={options} defaultValue="option1" />
          <RadioGroup label="Small" size="sm" options={options} defaultValue="option1" />
          <RadioGroup label="Medium" size="md" options={options} defaultValue="option1" />
          <RadioGroup label="Large" size="lg" options={options} defaultValue="option1" />
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="8" wrap="wrap">
          <RadioGroup label="Blue" colorPalette="blue" options={frequencyOptions} defaultValue="daily" />
          <RadioGroup label="Green" colorPalette="green" options={frequencyOptions} defaultValue="weekly" />
          <RadioGroup label="Red" colorPalette="red" options={frequencyOptions} defaultValue="monthly" />
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <RadioGroup
          label="Notification frequency"
          hint="Choose how often you want to receive updates"
          options={frequencyOptions}
          defaultValue="weekly"
        />
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="8" wrap="wrap">
          <RadioGroup label="Disabled" disabled options={options} defaultValue="option1" />
          <RadioGroup label="Invalid" invalid error="Please select an option" options={options} />
        </Flex.H>
      </ExampleSection>

      {/* Disabled individual options */}
      <ExampleSection title="Disabled Individual Options">
        <RadioGroup
          label="Availability"
          options={[
            { value: 'available', label: 'Available' },
            { value: 'unavailable', label: 'Unavailable', disabled: true },
            { value: 'coming-soon', label: 'Coming Soon', disabled: true },
          ]}
          defaultValue="available"
        />
      </ExampleSection>

      <Divider />

      {/* Use Case: Plan Selection */}
      <ExampleSection title="Use Case: Plan Selection">
        <RadioGroup
          label="Select a plan"
          options={[
            { value: 'free', label: 'Free — 5 projects, 1GB storage' },
            { value: 'pro', label: 'Pro — Unlimited projects, 100GB storage' },
            { value: 'enterprise', label: 'Enterprise — Custom limits, priority support' },
          ]}
        />
      </ExampleSection>
    </Flex.V>
  );
};
