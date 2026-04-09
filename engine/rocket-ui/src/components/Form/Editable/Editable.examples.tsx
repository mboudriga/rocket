import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { Editable } from './Editable';

export const EditableExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box width="300px">
          <Editable defaultValue="Click to edit" placeholder="Enter text">
            <Editable.Preview />
            <Editable.Input />
          </Editable>
        </Box>
      </ExampleSection>

      {/* With controls */}
      <ExampleSection title="With Controls">
        <Box width="300px">
          <Editable defaultValue="Click to edit me">
            <Editable.Preview />
            <Editable.Input />
            <Editable.Control>
              <Editable.EditTrigger asChild>
                <Button size="xs" variant="ghost">
                  Edit
                </Button>
              </Editable.EditTrigger>
              <Editable.CancelTrigger asChild>
                <Button size="xs" variant="ghost">
                  Cancel
                </Button>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <Button size="xs" variant="ghost">
                  Save
                </Button>
              </Editable.SubmitTrigger>
            </Editable.Control>
          </Editable>
        </Box>
      </ExampleSection>

      {/* Activation modes */}
      <ExampleSection title="Activation Modes">
        <Flex.V gap="4">
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Focus (default)
            </Text>
            <Editable activationMode="focus" defaultValue="Focus to edit">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Click
            </Text>
            <Editable activationMode="click" defaultValue="Click to edit">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Double click
            </Text>
            <Editable activationMode="dblclick" defaultValue="Double-click to edit">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Submit modes */}
      <ExampleSection title="Submit Modes">
        <Flex.V gap="4">
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Both (Enter & Blur)
            </Text>
            <Editable submitMode="both" defaultValue="Press Enter or click away">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Enter only
            </Text>
            <Editable submitMode="enter" defaultValue="Press Enter to submit">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
          <Box width="300px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Blur only
            </Text>
            <Editable submitMode="blur" defaultValue="Click away to submit">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With placeholder */}
      <ExampleSection title="With Placeholder">
        <Box width="300px">
          <Editable placeholder="Click to add a title">
            <Editable.Preview />
            <Editable.Input />
          </Editable>
        </Box>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="6" wrap="wrap">
          <Box width="200px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Disabled
            </Text>
            <Editable disabled defaultValue="Disabled">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
          <Box width="200px">
            <Text fontSize="xs" color="fg.muted" marginBottom="1">
              Read-only
            </Text>
            <Editable readOnly defaultValue="Read only">
              <Editable.Preview />
              <Editable.Input />
            </Editable>
          </Box>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
