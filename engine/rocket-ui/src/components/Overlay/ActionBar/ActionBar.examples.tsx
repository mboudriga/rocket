import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Checkbox } from '@components/Form/Checkbox';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { ActionBar } from './ActionBar';

export const ActionBarExamples: FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [multiOpen, setMultiOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Button onClick={() => setBasicOpen(!basicOpen)}>
          {basicOpen ? 'Close' : 'Open'} Action Bar
        </Button>
        <ActionBar
          open={basicOpen}
          actions={[
            { label: 'Edit', variant: 'outline' },
            { label: 'Delete', colorPalette: 'red' },
          ]}
          onClose={() => setBasicOpen(false)}
        />
      </ExampleSection>

      {/* With multiple actions */}
      <ExampleSection title="Multiple Actions">
        <Button onClick={() => setMultiOpen(!multiOpen)}>
          {multiOpen ? 'Close' : 'Open'} Action Bar
        </Button>
        <ActionBar
          open={multiOpen}
          actions={[
            { label: 'Copy', variant: 'outline' },
            { label: 'Move', variant: 'outline' },
            { label: 'Archive', variant: 'outline' },
            { label: 'Delete', colorPalette: 'red' },
          ]}
          hasCloseTrigger={false}
          onClose={() => setMultiOpen(false)}
        />
      </ExampleSection>

      <Divider />

      {/* Use case: Selectable list */}
      <ExampleSection title="Use Case: Selectable List">
        <Box
          border="1px solid"
          borderColor="border"
          borderRadius="lg"
          overflow="hidden"
          maxWidth="400px"
        >
          {items.map((item, i) => (
            <Flex.H
              key={item}
              padding="3"
              borderBottom={i < items.length - 1 ? '1px solid' : 'none'}
              borderColor="border"
              align="center"
              gap="3"
              bg={selectedItems.includes(item) ? 'blue.subtle' : 'transparent'}
            >
              <Checkbox
                label={item}
                checked={selectedItems.includes(item)}
                onCheckedChange={() => toggleItem(item)}
              />
            </Flex.H>
          ))}
        </Box>
        <ActionBar
          open={selectedItems.length > 0}
          selectionText={`${selectedItems.length} selected`}
          actions={[
            { label: 'Archive', variant: 'outline', onClick: () => setSelectedItems([]) },
            {
              label: 'Delete',
              colorPalette: 'red',
              onClick: () => setSelectedItems([]),
            },
          ]}
          onClose={() => setSelectedItems([])}
        />
        <Text fontSize="sm" color="fg.muted" marginTop="2">
          Select items above to see the action bar appear
        </Text>
      </ExampleSection>
    </Flex.V>
  );
};
