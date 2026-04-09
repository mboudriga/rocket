import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Switch } from './Switch';
import { SwitchExamples } from './Switch.examples';
import { SwitchDefaultProps, type SwitchProps } from './Switch.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Toggle switch for binary on/off settings with immediate effect.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Feature enable/disable toggles',
    'Dark mode toggle',
    'Notification preferences',
    'Privacy or visibility settings',
    'Auto-save or sync toggles',
  ],
  bad: [
    'Form agreement checkboxes (use Checkbox)',
    'Multi-select lists (use Checkbox)',
    'Mutually exclusive options (use RadioGroup)',
    'Action triggers (use Button)',
    'Segment selection (use SegmentedControl)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Switch> = (args: SwitchProps) => <Switch {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Switch';

// Initial story props which override the default
const INITIAL_PROPS: SwitchProps = {
  defaultChecked: true,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  checked: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Switch',
  component: Switch,
  args: { ...SwitchDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Switch.test.tsx',
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
        examples={<SwitchExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Switch>;
