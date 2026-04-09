import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Editable } from './Editable';
import { EditableExamples } from './Editable.examples';
import { EditableDefaultProps, type EditableProps } from './Editable.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Inline text that becomes an input on click for in-place editing.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [
  'Label',
  'Area',
  'Input',
  'Preview',
  'Control',
  'EditTrigger',
  'SubmitTrigger',
  'CancelTrigger',
];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Inline title or heading editing',
    'Table cell inline editing',
    'Profile name quick edit',
    'Label or tag renaming',
    'Comment or note editing in place',
  ],
  bad: [
    'Full form fields (use Input)',
    'Rich text editing (use RichTextEditor)',
    'Multi-field forms (use Input + Flex.V)',
    'Password editing (use PasswordInput)',
    'Long-form text editing (use Textarea)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Editable> = (args: EditableProps) => (
  <Editable {...args}>
    <Editable.Preview />
    <Editable.Input />
  </Editable>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Editable';

// Initial story props which override the default
const INITIAL_PROPS: EditableProps = {
  defaultValue: 'Click to edit',
  placeholder: 'Enter text',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  onValueChange: { control: false },
  onValueCommit: { control: false },
  onValueRevert: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Editable',
  component: Editable,
  args: { ...EditableDefaultProps, ...INITIAL_PROPS, onCommit: fn(), onRevert: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Editable.test.tsx',
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
        examples={<EditableExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Editable>;
