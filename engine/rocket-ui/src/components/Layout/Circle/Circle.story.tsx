import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Circle } from './Circle';
import { CircleExamples } from './Circle.examples';
import { CircleDefaultProps, type CircleProps } from './Circle.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Renders a circular container with a fixed size.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Status indicator dots',
    'Step number badges',
    'Small icon containers',
    'Online/offline presence indicators',
    'Notification count badges',
  ],
  bad: [
    'User avatars (use Avatar)',
    'General centering (use Center)',
    'Status text labels (use Badge)',
    'Large circular images (use Avatar)',
    'Progress indicators (use ProgressCircle)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Circle> = (args: CircleProps) => (
  <Circle {...args} size="40px" bg="blue.solid" color="blue.contrast">
    A
  </Circle>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Circle';

// Initial story props which override the default
const INITIAL_PROPS: CircleProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Circle',
  component: Circle,
  args: { ...CircleDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Circle.test.tsx',
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
        examples={<CircleExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Circle>;
