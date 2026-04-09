import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Combobox } from './Combobox';

const frameworkItems = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

const countryItems = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

export const ComboboxExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic (Single Selection)">
        <Box width="250px">
          <Combobox placeholder="Select a framework" items={frameworkItems} />
        </Box>
      </ExampleSection>

      {/* Multiple selection */}
      <ExampleSection title="Multiple Selection">
        <Box width="300px">
          <Combobox multiple placeholder="Select frameworks" items={frameworkItems} />
        </Box>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <Box width="250px">
            <Combobox label="Framework" placeholder="Select..." items={frameworkItems} />
          </Box>
          <Box width="280px">
            <Combobox
              label="Country"
              hint="Start typing to filter"
              placeholder="Search countries..."
              items={countryItems}
            />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="start">
          <Box width="200px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Small
            </Text>
            <Combobox size="sm" placeholder="Small" items={frameworkItems} />
          </Box>
          <Box width="200px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Medium
            </Text>
            <Combobox size="md" placeholder="Medium" items={frameworkItems} />
          </Box>
          <Box width="200px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Large
            </Text>
            <Combobox size="lg" placeholder="Large" items={frameworkItems} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" wrap="wrap">
          <Box width="220px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Outline
            </Text>
            <Combobox variant="outline" placeholder="Outline variant" items={frameworkItems} />
          </Box>
          <Box width="220px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Subtle
            </Text>
            <Combobox variant="subtle" placeholder="Subtle variant" items={frameworkItems} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Box width="200px">
            <Combobox label="Disabled" disabled placeholder="Disabled" items={frameworkItems} />
          </Box>
          <Box width="220px">
            <Combobox label="Invalid" invalid error="Required field" placeholder="Invalid" items={frameworkItems} />
          </Box>
          <Box width="200px">
            <Combobox label="Read Only" readOnly defaultValue={['react']} items={frameworkItems} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* With disabled items */}
      <ExampleSection title="Disabled Individual Items">
        <Box width="250px">
          <Combobox
            placeholder="Select..."
            items={[
              { value: 'available1', label: 'Available Option' },
              { value: 'disabled1', label: 'Disabled Option', disabled: true },
              { value: 'available2', label: 'Another Available' },
              { value: 'disabled2', label: 'Also Disabled', disabled: true },
            ]}
          />
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
