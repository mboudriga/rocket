import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Skeleton } from './Skeleton';
import { SkeletonExamples } from './Skeleton.examples';
import { SkeletonDefaultProps, type SkeletonProps } from './Skeleton.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Loading placeholder that mimics the shape of content being loaded.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = ['Circle', 'Text'];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Page layout loading placeholders',
    'Card content loading states',
    'List item shimmer effects',
    'Avatar and image placeholders',
    'Text block loading indicators',
  ],
  bad: [
    'Indeterminate spinner loading (use Spinner)',
    'Progress with known percentage (use Progress)',
    'Empty content states (use EmptyState)',
    'Error states (use Alert)',
    'Button loading (use Button `loading` prop)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Skeleton> = (args: SkeletonProps) => <Skeleton {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Skeleton';

// Initial story props which override the default
const INITIAL_PROPS: SkeletonProps = {
  height: '20px',
  width: '200px',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  args: { ...SkeletonDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Skeleton.test.tsx',
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
        examples={<SkeletonExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Skeleton>;
