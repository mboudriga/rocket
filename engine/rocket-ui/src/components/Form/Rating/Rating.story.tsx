import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Rating } from './Rating';
import { RatingExamples } from './Rating.examples';
import { RatingDefaultProps, type RatingProps } from './Rating.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Star-based rating input for collecting or displaying scores.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Product review ratings',
    'Service feedback scores',
    'Content quality ratings',
    'User satisfaction surveys',
    'Read-only display of average scores',
  ],
  bad: [
    'Numeric value entry (use NumberInput)',
    'Continuous range selection (use Slider)',
    'Upvote/downvote (use Button or IconButton)',
    'Progress indication (use Progress)',
    'Ranked ordering (use drag-and-drop)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Rating> = (args: RatingProps) => (
  <Rating {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Rating';

// Initial story props which override the default
const INITIAL_PROPS: RatingProps = {
  label: 'Rate your experience',
  defaultValue: 3,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Rating',
  component: Rating,
  args: { ...RatingDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Rating.test.tsx',
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
        examples={<RatingExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Rating>;
