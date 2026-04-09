import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Spinner } from './Spinner';
import { SpinnerExamples } from './Spinner.examples';
import { SpinnerDefaultProps, type SpinnerProps } from './Spinner.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Animated loading indicator for pending operations.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Button loading state indicator',
    'Page or section loading',
    'Async operation pending feedback',
    'Lazy-loaded content placeholder',
    'Inline loading next to text',
  ],
  bad: [
    'Content layout placeholders (use Skeleton)',
    'Progress with known percentage (use Progress)',
    'Long-running background tasks (use Progress)',
    'Error or empty states (use Alert or EmptyState)',
    'Full page loading screens (use Skeleton layout)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Spinner> = (args: SpinnerProps) => <Spinner {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Spinner';

// Initial story props which override the default
const INITIAL_PROPS: SpinnerProps = {
  borderWidth: '2px',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  args: { ...SpinnerDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Spinner.test.tsx',
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
        examples={<SpinnerExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Spinner>;
