import type { Meta, StoryObj } from '@storybook/react-vite';
import { LuCheck, LuPackage, LuTruck } from 'react-icons/lu';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Timeline } from './Timeline';
import { TimelineExamples } from './Timeline.examples';
import { TimelineDefaultProps, type TimelineProps } from './Timeline.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Vertical sequence of events with status indicators and icons.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Order status tracking',
    'Activity or audit logs',
    'Project milestone tracking',
    'Version history display',
    'Onboarding step progress',
  ],
  bad: [
    'Tabular data (use Table)',
    'Step-by-step wizard (use Steps)',
    'Simple bulleted lists (use List)',
    'Key-value pairs (use DataList)',
    'Calendar views (use DatePicker)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Timeline> = (args: TimelineProps) => (
  <Timeline {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Timeline';

// Initial story props which override the default
const INITIAL_PROPS: TimelineProps = {
  items: [
    { title: 'Order Placed', description: 'Jan 15, 2024', icon: <LuCheck />, status: 'complete' },
    { title: 'Shipped', description: 'Jan 16, 2024', icon: <LuPackage />, status: 'complete' },
    {
      title: 'Out for Delivery',
      description: 'Expected Jan 18',
      icon: <LuTruck />,
      status: 'current',
    },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/Timeline',
  component: Timeline,
  args: { ...TimelineDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Timeline.test.tsx',
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
        examples={<TimelineExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Timeline>;
