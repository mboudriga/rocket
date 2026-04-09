import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Input } from './Input';
import { InputExamples } from './Input.examples';
import { InputDefaultProps, type InputProps } from './Input.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Single-line text input with integrated label, hint, and error props.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Names, emails, and short text fields',
    'Search bars',
    'URL or phone number entry',
    'Single-line form fields',
    'Inline filtering inputs',
  ],
  bad: [
    'Multi-line text (use Textarea)',
    'Password entry (use PasswordInput)',
    'Numeric values with stepper (use NumberInput)',
    'Selecting from predefined options (use Select)',
    'Tag or multi-value entry (use TagsInput)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Input> = (args: InputProps) => <Input {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Input';

// Initial story props which override the default
const INITIAL_PROPS: InputProps = {
  label: 'Name',
  placeholder: 'This should be easy',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  onChange: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Input',
  component: Input,
  args: { ...InputDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Input.test.tsx',
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
        examples={<InputExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Input>;
