import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Checkbox } from './Checkbox';
import { CheckboxExamples } from './Checkbox.examples';
import { CheckboxDefaultProps, type CheckboxProps } from './Checkbox.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Boolean toggle for accepting terms, enabling features, or multi-select lists.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Terms and conditions acceptance',
    'Feature opt-in toggles in forms',
    'Multi-select item lists',
    '"Select all" with indeterminate state',
    'Filter checkboxes in sidebars',
  ],
  bad: [
    'Single on/off toggle (use Switch)',
    'Mutually exclusive options (use RadioGroup)',
    'Binary action trigger (use Button)',
    'Status display (use Badge)',
    'Segment selection (use SegmentedControl)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Checkbox> = (args: CheckboxProps) => <Checkbox {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Checkbox';

// Initial story props which override the default
const INITIAL_PROPS: CheckboxProps = {
  label: 'Check me out',
  defaultChecked: true,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  checked: { control: false },
  onChange: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  args: { ...CheckboxDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Checkbox.test.tsx',
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
        examples={<CheckboxExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Checkbox>;
