import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { TagsInput } from './TagsInput';

export const TagsInputExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box width="300px">
          <TagsInput placeholder="Add tags..." defaultValue={['React', 'TypeScript']} />
        </Box>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Box width="300px">
          <TagsInput label="Skills" hint="Press Enter to add a tag" placeholder="Add skill..." />
        </Box>
      </ExampleSection>

      {/* With max tags */}
      <ExampleSection title="Max Tags Limit">
        <Box width="300px">
          <TagsInput
            max={3}
            placeholder="Max 3 tags"
            hint="You can add up to 3 tags"
            defaultValue={['One']}
          />
        </Box>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" wrap="wrap">
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Outline
            </Text>
            <TagsInput variant="outline" placeholder="Outline variant" defaultValue={['Tag 1']} />
          </Box>
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Subtle
            </Text>
            <TagsInput variant="subtle" placeholder="Subtle variant" defaultValue={['Tag 1']} />
          </Box>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <Box width="280px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Small
            </Text>
            <TagsInput size="sm" placeholder="Small" defaultValue={['Tag']} />
          </Box>
          <Box width="280px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Medium
            </Text>
            <TagsInput size="md" placeholder="Medium" defaultValue={['Tag']} />
          </Box>
          <Box width="280px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Large
            </Text>
            <TagsInput size="lg" placeholder="Large" defaultValue={['Tag']} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Allow duplicates */}
      <ExampleSection title="Allow Duplicates">
        <Box width="300px">
          <TagsInput
            allowDuplicates
            placeholder="Duplicates allowed"
            hint="You can add the same tag multiple times"
          />
        </Box>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Box width="250px">
            <TagsInput disabled defaultValue={['Tag 1', 'Tag 2']} />
          </Box>
          <Box width="250px">
            <TagsInput invalid error="Invalid tags" placeholder="Invalid" />
          </Box>
          <Box width="250px">
            <TagsInput readOnly defaultValue={['Read', 'Only']} />
          </Box>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
