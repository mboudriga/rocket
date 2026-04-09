import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Steps } from './Steps';
import { StepsExamples } from './Steps.examples';
import { StepsDefaultProps, type StepsProps } from './Steps.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Step indicator for multi-step wizards and sequential processes.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange is value-based: (step) => setStep(step), not event-based.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Multi-step form wizards',
    'Onboarding flow progress',
    'Checkout process steps',
    'Setup or configuration wizards',
    'Tutorial progression',
  ],
  bad: [
    'Tab-based content switching (use Tabs)',
    'Timeline or event history (use Timeline)',
    'Progress bar display (use Progress)',
    'Collapsible sections (use Accordion)',
    'Navigation breadcrumbs (use Breadcrumb)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Steps> = (args: StepsProps) => <Steps {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Steps';

// Initial story props which override the default
const INITIAL_PROPS: StepsProps = {
  items: [
    { title: 'Step 1', description: 'Account details' },
    { title: 'Step 2', description: 'Personal info' },
    { title: 'Step 3', description: 'Review' },
  ],
  defaultStep: 0,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Disclosure/Steps',
  component: Steps,
  args: { ...StepsDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Steps.test.tsx',
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
        examples={<StepsExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Steps>;
