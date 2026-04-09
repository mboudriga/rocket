import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Stat } from './Stat';
import { StatExamples } from './Stat.examples';
import { StatDefaultProps, type StatProps } from './Stat.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Displays a key metric with label, value, and optional trend indicator.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Dashboard KPI displays',
    'Revenue or user count metrics',
    'Performance score summaries',
    'Comparison statistics',
    'Summary cards in admin panels',
  ],
  bad: [
    'Key-value detail lists (use DataList)',
    'Tabular data (use Table)',
    'Progress toward a goal (use Progress)',
    'Real-time counters (use custom component)',
    'Long descriptions (use Card)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Stat> = (args: StatProps) => <Stat {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Stat';

// Initial story props which override the default
const INITIAL_PROPS: StatProps = {
  label: 'Users this week',
  children: '3,481',
  subLabel: '27%',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/Stat',
  component: Stat,
  args: { ...StatDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Stat.test.tsx',
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
        examples={<StatExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Stat>;
