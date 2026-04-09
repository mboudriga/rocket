import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Form } from './Form';
import { FormExamples } from './Form.examples';
import { FormDefaultProps, type FormProps } from './Form.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Form container that wraps fields and handles submission.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Login and registration forms',
    'Settings and preference pages',
    'Data entry and creation forms',
    'Search forms with submit',
    'Multi-field filter forms',
  ],
  bad: [
    'Single toggle action (use Switch)',
    'Display-only content (use Card or DataList)',
    'Search with instant results (use Input with onChange)',
    'Navigation (use Link or Tabs)',
    'Confirmation prompts (use AlertDialog)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Form> = (args: FormProps) => <Form {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Form';

// Initial story props which override the default
const INITIAL_PROPS: FormProps = {
  id: 'preview-form',
  children: 'Give me Form elements to render.',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Form',
  component: Form,
  args: { ...FormDefaultProps, ...INITIAL_PROPS, onSubmit: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Form.test.tsx',
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
        examples={<FormExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Form>;
