import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { ProgressCircle } from './ProgressCircle';
import { ProgressCircleExamples } from './ProgressCircle.examples';
import { ProgressCircleDefaultProps, type ProgressCircleProps } from './ProgressCircle.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Circular progress indicator with optional value display.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Dashboard metric gauges',
    'Score or rating circles',
    'Compact completion indicators',
    'Timer countdown displays',
    'Skill or stat level indicators',
  ],
  bad: [
    'Linear progress bars (use Progress)',
    'Indeterminate loading (use Spinner)',
    'Step-by-step progress (use Steps)',
    'Numeric input (use NumberInput)',
    'Rating input (use Rating)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof ProgressCircle> = (args: ProgressCircleProps) => (
  <ProgressCircle {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'ProgressCircle';

// Initial story props which override the default
const INITIAL_PROPS: ProgressCircleProps = {
  value: 50,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/ProgressCircle',
  component: ProgressCircle,
  args: { ...ProgressCircleDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ProgressCircle.test.tsx',
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
        examples={<ProgressCircleExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ProgressCircle>;
