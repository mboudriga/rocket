import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { SegmentedControl } from './SegmentedControl';
import { SegmentedControlExamples } from './SegmentedControl.examples';
import { SegmentedControlDefaultProps, type SegmentedControlProps } from './SegmentedControl.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Horizontal button group for switching between mutually exclusive views.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'View mode toggles (list/grid/table)',
    'Time period filters (day/week/month)',
    'Content type tabs (all/active/archived)',
    'Unit toggles (metric/imperial)',
    'Alignment or size selectors',
  ],
  bad: [
    'More than 5 options (use Tabs or Select)',
    'Long option labels (use RadioGroup)',
    'Navigation between pages (use Tabs)',
    'Form submission actions (use Button)',
    'On/off binary toggle (use Switch)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof SegmentedControl> = (args: SegmentedControlProps) => (
  <SegmentedControl {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'SegmentedControl';

// Initial story props which override the default
const INITIAL_PROPS: SegmentedControlProps = {
  label: 'View mode',
  items: [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'table', label: 'Table' },
  ],
  defaultValue: 'list',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/SegmentedControl',
  component: SegmentedControl,
  args: { ...SegmentedControlDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'SegmentedControl.test.tsx',
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
        examples={<SegmentedControlExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof SegmentedControl>;
