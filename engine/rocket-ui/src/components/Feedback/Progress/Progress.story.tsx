import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Progress } from './Progress';
import { ProgressExamples } from './Progress.examples';
import { ProgressDefaultProps, type ProgressProps } from './Progress.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Horizontal progress bar for showing completion percentage.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'File upload progress',
    'Multi-step form completion',
    'Profile completeness meters',
    'Download or processing progress',
    'Quota or limit usage bars',
  ],
  bad: [
    'Circular progress display (use ProgressCircle)',
    'Indeterminate loading (use Spinner)',
    'Star-based ratings (use Rating)',
    'Step-by-step wizard (use Steps)',
    'Numeric value input (use Slider)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Progress> = (args: ProgressProps) => <Progress {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Progress';

// Initial story props which override the default
const INITIAL_PROPS: ProgressProps = {
  value: 50,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/Progress',
  component: Progress,
  args: { ...ProgressDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Progress.test.tsx',
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
        examples={<ProgressExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Progress>;
