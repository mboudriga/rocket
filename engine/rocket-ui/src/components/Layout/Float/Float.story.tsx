import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Box } from '../Box';
import { Float } from './Float';
import { FloatExamples } from './Float.examples';
import { FloatDefaultProps, type FloatProps } from './Float.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Positions a child element floating relative to its parent.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Parent must have position="relative" for Float to work correctly.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Online status dot on an avatar',
    'Notification badge on an icon',
    'Close button on a card corner',
    'Action button overlaid on an image',
    'Unread count indicator on a nav item',
  ],
  bad: [
    'Tooltip-like overlays (use Tooltip)',
    'Dropdown menus (use Menu)',
    'Fixed-position elements (use `position: fixed` on Box)',
    'Modal or dialog overlays (use Dialog)',
    'General absolute positioning (use Box with `position="absolute"`)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Float> = (args: FloatProps) => (
  <Box
    position="relative"
    width="80px"
    height="80px"
    bg="blue.subtle"
    borderRadius="md"
    border="1px solid"
    borderColor="blue.muted"
  >
    <Float {...args}>
      <Box bg="red.solid" color="red.contrast" borderRadius="full" px="2" py="1" fontSize="xs">
        3
      </Box>
    </Float>
  </Box>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Float';

// Initial story props which override the default
const INITIAL_PROPS: FloatProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Float',
  component: Float,
  args: { ...FloatDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Float.test.tsx',
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
        examples={<FloatExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Float>;
