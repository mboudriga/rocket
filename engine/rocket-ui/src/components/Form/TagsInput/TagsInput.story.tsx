import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { TagsInput } from './TagsInput';
import { TagsInputExamples } from './TagsInput.examples';
import { TagsInputDefaultProps, type TagsInputProps } from './TagsInput.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Multi-value input where users type and press Enter to add tags.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange value is a JSON-encoded array. Use JSON.parse(e.target.value) to get the string array.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Blog post tag entry',
    'Email recipient fields',
    'Skill or keyword tagging',
    'Category labeling',
    'Search filter terms',
  ],
  bad: [
    'Single selection from a list (use Select)',
    'Predefined multi-select (use Listbox)',
    'Searchable option list (use Combobox)',
    'Comma-separated text (use Input)',
    'Numeric value list (use custom component)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof TagsInput> = (args: TagsInputProps) => (
  <TagsInput {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'TagsInput';

// Initial story props which override the default
const INITIAL_PROPS: TagsInputProps = {
  label: 'Tags',
  placeholder: 'Add tag...',
  defaultValue: ['React', 'TypeScript'],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/TagsInput',
  component: TagsInput,
  args: { ...TagsInputDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'TagsInput.test.tsx',
      testResults: vitestResults,
    },
  },
  decorators: [
    (story, meta) => (
      <StoryTemplate
        meta={meta}
        layout={LAYOUT}
        description={DESCRIPTION}
        message={MESSAGE}
        notations={NOTATIONS}
        use={USE}
        examples={<TagsInputExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof TagsInput>;
