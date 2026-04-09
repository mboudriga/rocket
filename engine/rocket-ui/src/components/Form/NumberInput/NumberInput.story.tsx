import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { NumberInput } from './NumberInput';
import { NumberInputExamples } from './NumberInput.examples';
import { NumberInputDefaultProps, type NumberInputProps } from './NumberInput.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Numeric input with increment/decrement buttons and min/max constraints.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange returns a string, not a number. Use Number(e.target.value) if you need a numeric type.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Quantity selectors',
    'Price or currency inputs',
    'Age or year fields',
    'Configuration value fields',
    'Inventory count adjustments',
  ],
  bad: [
    'Phone numbers (use Input with type="tel")',
    'Date entry (use DatePicker)',
    'Range selection (use Slider)',
    'Star ratings (use Rating)',
    'PIN or OTP codes (use PinInput)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof NumberInput> = (args: NumberInputProps) => (
  <NumberInput {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'NumberInput';

// Initial story props which override the default
const INITIAL_PROPS: NumberInputProps = {
  label: 'Count',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  onChange: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/NumberInput',
  component: NumberInput,
  args: { ...NumberInputDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'NumberInput.test.tsx',
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
        examples={<NumberInputExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof NumberInput>;
