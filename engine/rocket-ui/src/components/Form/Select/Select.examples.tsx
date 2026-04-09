import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Select } from './Select';

const selectOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const SelectExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box width="200px">
          <Select label="Size" placeholder="Select size" options={selectOptions} />
        </Box>
      </ExampleSection>

      {/* Single vs Multiple */}
      <ExampleSection title="Single vs Multiple Selection">
        <Flex.H gap="4" wrap="wrap">
          <Box width="200px">
            <Select label="Single" placeholder="Single select" options={selectOptions} />
          </Box>
          <Box width="250px">
            <Select label="Multiple" multiple placeholder="Multi select" options={selectOptions} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <Box width="220px">
            <Select label="Size" placeholder="Select..." options={selectOptions} />
          </Box>
          <Box width="250px">
            <Select
              label="Framework"
              hint="Choose your preferred framework"
              placeholder="Select..."
              options={frameworkOptions}
            />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Orientation */}
      <ExampleSection title="Orientation">
        <Flex.V gap="4">
          <Box width="250px">
            <Select
              orientation="vertical"
              label="Vertical (default)"
              placeholder="Select..."
              options={selectOptions}
            />
          </Box>
          <Box width="400px">
            <Select
              orientation="horizontal"
              label="Horizontal"
              placeholder="Select..."
              options={selectOptions}
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Box width="180px">
            <Select label="Disabled" disabled placeholder="Disabled" options={selectOptions} />
          </Box>
          <Box width="200px">
            <Select label="Invalid" invalid error="Required field" placeholder="Invalid" options={selectOptions} />
          </Box>
          <Box width="180px">
            <Select label="Read only" readOnly value={['medium']} options={selectOptions} />
          </Box>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
