import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { PasswordInput } from './PasswordInput';
import { PasswordInputExamples } from './PasswordInput.examples';
import { PasswordInputDefaultProps, type PasswordInputProps } from './PasswordInput.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Password field with built-in visibility toggle button.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Login password fields',
    'Registration password entry',
    'Password confirmation fields',
    'API key or secret token entry',
    'PIN entry requiring masking',
  ],
  bad: [
    'Regular text entry (use Input)',
    'Numeric PIN codes (use PinInput)',
    'Search fields (use Input)',
    'Multi-line secrets (use Textarea)',
    'Non-sensitive text (use Input)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof PasswordInput> = (args: PasswordInputProps) => (
  <PasswordInput {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'PasswordInput';

// Initial story props which override the default
const INITIAL_PROPS: PasswordInputProps = {
  label: 'Password',
  placeholder: 'Enter your password',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/PasswordInput',
  component: PasswordInput,
  args: { ...PasswordInputDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'PasswordInput.test.tsx',
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
        examples={<PasswordInputExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof PasswordInput>;
