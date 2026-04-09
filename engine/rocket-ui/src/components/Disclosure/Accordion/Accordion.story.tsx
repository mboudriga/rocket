import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Accordion } from './Accordion';
import { AccordionExamples } from './Accordion.examples';
import { AccordionDefaultProps, type AccordionProps } from './Accordion.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Vertically stacked collapsible sections with expand/collapse.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'FAQ sections',
    'Settings category groups',
    'Documentation sections',
    'Filter group toggles',
    'Form section progressive disclosure',
  ],
  bad: [
    'Tab-based content switching (use Tabs)',
    'Step-by-step wizards (use Steps)',
    'Single collapsible section (use Collapsible)',
    'Navigation menus (use Menu)',
    'Data tables (use Table)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Accordion> = (args: AccordionProps) => (
  <Accordion {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Accordion';

// Initial story props which override the default
const INITIAL_PROPS: AccordionProps = {
  items: [
    { value: 'breakfast', title: 'Breakfast', content: 'Eggs and toast.' },
    { value: 'lunch', title: 'Lunch', content: 'Burger and fries.' },
    { value: 'dinner', title: 'Dinner', content: 'Chicken and rice.' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  defaultValue: { control: false },
};

// Story constructor
export default {
  title: 'Components/Disclosure/Accordion',
  component: Accordion,
  args: { ...AccordionDefaultProps, ...INITIAL_PROPS, onValueChange: fn(), onFocusChange: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Accordion.test.tsx',
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
        examples={<AccordionExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Accordion>;
