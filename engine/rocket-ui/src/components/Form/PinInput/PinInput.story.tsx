import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { PinInput } from './PinInput';
import { PinInputExamples } from './PinInput.examples';
import { PinInputDefaultProps, type PinInputProps } from './PinInput.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Individual character input fields for PIN codes and OTP verification.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'OTP verification codes',
    'Two-factor authentication entry',
    'Short PIN entry (4-6 digits)',
    'Invite or access codes',
    'Phone number verification',
  ],
  bad: [
    'Long text entry (use Input)',
    'Password fields (use PasswordInput)',
    'Numeric values with stepper (use NumberInput)',
    'Search queries (use Input)',
    'Multi-character text (use Input)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof PinInput> = (args: PinInputProps) => <PinInput {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'PinInput';

// Initial story props which override the default
const INITIAL_PROPS: PinInputProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/PinInput',
  component: PinInput,
  args: { ...PinInputDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'PinInput.test.tsx',
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
        examples={<PinInputExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof PinInput>;
