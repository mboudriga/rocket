import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { RadioGroup } from './RadioGroup';
import { RadioGroupExamples } from './RadioGroup.examples';
import { RadioGroupDefaultProps, type RadioGroupProps } from './RadioGroup.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Mutually exclusive option selection displayed as a visible list of choices.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Subscription plan selection',
    'Shipping method choice',
    'Payment type selection',
    'Survey single-choice questions',
    'Settings with 3-5 visible options',
  ],
  bad: [
    'Long lists of 10+ options (use Select)',
    'Searchable option lists (use Combobox)',
    'Binary toggle (use Switch)',
    'Compact inline selection (use SegmentedControl)',
    'Multi-select (use Checkbox group or Listbox)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof RadioGroup> = (args: RadioGroupProps) => (
  <RadioGroup {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'RadioGroup';

// Initial story props which override the default
const INITIAL_PROPS: RadioGroupProps = {
  label: 'Choose a framework',
  options: [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  value: { control: false },
  defaultValue: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup,
  args: { ...RadioGroupDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'RadioGroup.test.tsx',
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
        examples={<RadioGroupExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof RadioGroup>;
