import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Tabs } from './Tabs';
import { TabsExamples } from './Tabs.examples';
import { TabsDefaultProps, type TabsProps } from './Tabs.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Horizontal tab navigation for switching between content panels.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange is value-based: (value) => setTab(value), not event-based.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Content section switching',
    'Settings page categories',
    'Dashboard view toggles',
    'Detail view sections (overview, activity, settings)',
    'Code example language switching',
  ],
  bad: [
    '2-3 compact inline options (use SegmentedControl)',
    'Vertically stacked sections (use Accordion)',
    'Step-by-step wizard (use Steps)',
    'Navigation between pages (use Link + Router)',
    'Dropdown option selection (use Select)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Tabs> = (args: TabsProps) => (
  <Tabs {...args}>
    {args.tabs?.map((tab) => (
      <div key={tab.value} style={{ padding: '16px' }}>
        {tab.title} content
      </div>
    ))}
  </Tabs>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Tabs';

// Initial story props which override the default
const INITIAL_PROPS: TabsProps = {
  defaultValue: 'monday',
  tabs: [
    { title: 'Monday', value: 'monday' },
    { title: 'Tuesday', value: 'tuesday' },
    { title: 'Wednesday', value: 'wednesday' },
    { title: 'Thursday', value: 'thursday' },
    { title: 'Friday', value: 'friday' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  defaultValue: { control: false },
  onChange: { control: false },
};

// Story constructor
export default {
  title: 'Components/Disclosure/Tabs',
  component: Tabs,
  args: { ...TabsDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Tabs.test.tsx',
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
        examples={<TabsExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Tabs>;
