import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Listbox } from './Listbox';

const frameworkItems = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const languageItems = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
];

const groupedItems = [
  {
    label: 'Frontend',
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'go', label: 'Go' },
    ],
  },
];

export const ListboxExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic (Single Selection)">
        <Box width="250px">
          <Listbox label="Framework" items={frameworkItems} defaultValue={['react']} />
        </Box>
      </ExampleSection>

      {/* Multiple selection */}
      <ExampleSection title="Multiple Selection">
        <Box width="250px">
          <Listbox
            label="Frameworks"
            selectionMode="multiple"
            items={frameworkItems}
            defaultValue={['react', 'vue']}
          />
        </Box>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Box width="280px">
          <Listbox
            label="Framework"
            hint="Select your preferred framework"
            items={frameworkItems}
          />
        </Box>
      </ExampleSection>

      {/* With groups */}
      <ExampleSection title="With Groups">
        <Box width="280px">
          <Listbox label="Technology Stack" groups={groupedItems} />
        </Box>
      </ExampleSection>

      {/* Longer list */}
      <ExampleSection title="Longer List">
        <Box width="250px">
          <Listbox
            label="Programming Language"
            items={languageItems}
            defaultValue={['typescript']}
          />
        </Box>
      </ExampleSection>

      {/* Disabled individual items */}
      <ExampleSection title="Disabled Individual Items">
        <Box width="250px">
          <Listbox
            label="Options"
            items={[
              { value: 'available', label: 'Available Option' },
              { value: 'disabled1', label: 'Disabled Option', disabled: true },
              { value: 'another', label: 'Another Available' },
              { value: 'disabled2', label: 'Also Disabled', disabled: true },
            ]}
          />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
