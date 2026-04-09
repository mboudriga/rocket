import { Button } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LuInbox } from 'react-icons/lu';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { EmptyState } from './EmptyState';
import { EmptyStateExamples } from './EmptyState.examples';
import { EmptyStateDefaultProps, type EmptyStateProps } from './EmptyState.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Placeholder for content areas with no data, with icon, title, and action.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Empty table or list state',
    'No search results messaging',
    'First-time user prompts',
    'Empty inbox or feed display',
    'Feature not-yet-configured state',
  ],
  bad: [
    'Loading placeholders (use Skeleton)',
    'Error messages (use Alert)',
    'Success confirmations (use toast)',
    '404 or error pages (use custom page)',
    'Disabled feature explanation (use Alert)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof EmptyState> = (args: EmptyStateProps) => (
  <EmptyState {...args}>
    <Button>Add Item</Button>
  </EmptyState>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'EmptyState';

// Initial story props which override the default
const INITIAL_PROPS: EmptyStateProps = {
  icon: <LuInbox />,
  title: 'No items found',
  description: 'Try adding a new item to get started.',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  args: { ...EmptyStateDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'EmptyState.test.tsx',
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
        examples={<EmptyStateExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof EmptyState>;
