import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Textarea } from './Textarea';
import { TextareaExamples } from './Textarea.examples';
import { TextareaDefaultProps, type TextareaProps } from './Textarea.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Multi-line text input with resize control and integrated field props.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Comments and feedback forms',
    'Bio or description fields',
    'Notes and message composition',
    'Multi-line address entry',
    'Code or JSON input (plain text)',
  ],
  bad: [
    'Single-line text (use Input)',
    'Rich text with formatting (use RichTextEditor)',
    'Chat messages with send-on-enter (use RichTextEditor)',
    'Password fields (use PasswordInput)',
    'Structured data entry (use specific form components)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Textarea> = (args: TextareaProps) => <Textarea {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Textarea';

// Initial story props which override the default
const INITIAL_PROPS: TextareaProps = {
  label: 'Feedback',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Textarea',
  component: Textarea,
  args: { ...TextareaDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Textarea.test.tsx',
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
        examples={<TextareaExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Textarea>;
