import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const frequencyItems = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const viewItems = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'table', label: 'Table' },
];

const alignItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export const SegmentedControlExamples: FC = () => {
  const [view, setView] = useState('Board');

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <SegmentedControl items={frequencyItems} defaultValue="daily" />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Small
            </Text>
            <SegmentedControl size="sm" items={frequencyItems} defaultValue="daily" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Medium
            </Text>
            <SegmentedControl size="md" items={frequencyItems} defaultValue="daily" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Large
            </Text>
            <SegmentedControl size="lg" items={frequencyItems} defaultValue="daily" />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Different use cases */}
      <ExampleSection title="Use Cases">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              View Toggle
            </Text>
            <SegmentedControl items={viewItems} defaultValue="list" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Text Alignment
            </Text>
            <SegmentedControl items={alignItems} defaultValue="left" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Text Formatting
            </Text>
            <SegmentedControl
              items={[
                { value: 'bold', label: 'B' },
                { value: 'italic', label: 'I' },
                { value: 'underline', label: 'U' },
              ]}
              defaultValue="bold"
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With label */}
      <ExampleSection title="With Label and Hint">
        <SegmentedControl
          label="Billing Frequency"
          hint="Choose your preferred billing cycle"
          items={frequencyItems}
          defaultValue="monthly"
        />
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.V gap="4">
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Disabled
            </Text>
            <SegmentedControl disabled items={frequencyItems} defaultValue="daily" />
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Disabled Individual Item
            </Text>
            <SegmentedControl
              items={[
                { value: 'option1', label: 'Available' },
                { value: 'option2', label: 'Disabled', disabled: true },
                { value: 'option3', label: 'Available' },
              ]}
              defaultValue="option1"
            />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Flex.V gap="3">
          <SegmentedControl
            value={view}
            onChange={(e) => setView(e.target.value)}
            items={[
              { value: 'Board', label: 'Board' },
              { value: 'List', label: 'List' },
              { value: 'Timeline', label: 'Timeline' },
            ]}
          />
          <Text fontSize="sm" color="fg.muted">
            Current view: {view}
          </Text>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
