import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Badge } from './Badge';
import { BadgeExamples } from './Badge.examples';
import { BadgeDefaultProps, type BadgeProps } from './Badge.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Compact label for status indicators, counts, or categories.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Status indicators (active, pending, error)',
    'Notification counts',
    'Category or type labels',
    'Version or environment tags',
    'Priority or severity indicators',
  ],
  bad: [
    'Removable labels (use Tag)',
    'Interactive buttons (use Button)',
    'Large content blocks (use Card)',
    'Navigation items (use Link)',
    'Form selection display (use SegmentedControl)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Badge> = (args: BadgeProps) => <Badge {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Badge';

// Initial story props which override the default
const INITIAL_PROPS: BadgeProps = { children: 'New' };

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/Badge',
  component: Badge,
  args: { ...BadgeDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Badge.test.tsx',
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
        examples={<BadgeExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Badge>;
