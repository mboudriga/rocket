import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

export const RichTextEditorExamples: FC = () => {
  const [value, setValue] = useState('<p>This is <strong>rich</strong> text content.</p>');

  return (
    <Flex.V gap="8">
      {/* Basic Usage */}
      <ExampleSection title="Basic Usage">
        <RichTextEditor
          id="basic-editor"
          label="Description"
          placeholder="Write something..."
          width="100%"
          maxWidth="600px"
        />
      </ExampleSection>

      {/* Controlled Value */}
      <ExampleSection title="Controlled Value">
        <Flex direction={{ base: 'column', desktop: 'row' }} gap="4" width="100%">
          <Box flex="1">
            <RichTextEditor
              id="controlled-editor"
              label="Content"
              value={value}
              onChange={setValue}
            />
          </Box>
          <Box flex="1" padding="3" bg="bg.muted" borderRadius="md" fontSize="sm" overflow="auto">
            <Text fontWeight="medium" marginBottom="1">
              HTML Output:
            </Text>
            <code>{value}</code>
          </Box>
        </Flex>
      </ExampleSection>

      {/* With Character Count */}
      <ExampleSection title="With Character Count">
        <RichTextEditor
          id="char-count-editor"
          label="Bio"
          hint="Keep it brief"
          placeholder="Tell us about yourself..."
          showCharacterCount
          characterLimit={200}
          width="100%"
          maxWidth="600px"
        />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          <RichTextEditor
            id="small-editor"
            label="Small"
            size="sm"
            placeholder="Small editor"
            width="100%"
            maxWidth="500px"
          />
          <RichTextEditor
            id="medium-editor"
            label="Medium (default)"
            size="md"
            placeholder="Medium editor"
            width="100%"
            maxWidth="500px"
          />
          <RichTextEditor
            id="large-editor"
            label="Large"
            size="lg"
            placeholder="Large editor"
            width="100%"
            maxWidth="500px"
          />
        </Flex.V>
      </ExampleSection>

      {/* Custom Toolbar */}
      <ExampleSection title="Custom Toolbar (Basic Only)">
        <RichTextEditor
          id="custom-toolbar-editor"
          label="Simple Editor"
          width="100%"
          maxWidth="600px"
        >
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlGroup>
              <RichTextEditor.Control.Bold />
              <RichTextEditor.Control.Italic />
              <RichTextEditor.Control.Underline />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.Content />
        </RichTextEditor>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.V gap="4">
          <RichTextEditor
            id="disabled-editor"
            label="Disabled"
            disabled
            defaultValue="<p>This content is disabled</p>"
            width="100%"
            maxWidth="500px"
          />
          <RichTextEditor
            id="invalid-editor"
            label="With Error"
            invalid
            error="Content is required"
            width="100%"
            maxWidth="500px"
          />
          <RichTextEditor
            id="readonly-editor"
            label="Read Only"
            readOnly
            defaultValue="<p>This content is read-only and cannot be edited.</p>"
            width="100%"
            maxWidth="500px"
          />
        </Flex.V>
      </ExampleSection>

      {/* With Custom Height */}
      <ExampleSection title="Custom Height">
        <RichTextEditor
          id="custom-height-editor"
          label="Tall Editor"
          placeholder="Lots of space to write..."
          minHeight="300px"
          maxHeight="400px"
          width="100%"
          maxWidth="600px"
        />
      </ExampleSection>
    </Flex.V>
  );
};
