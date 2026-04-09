import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Divider } from './Divider';
import { DividerExamples } from './Divider.examples';
import { DividerDefaultProps, type DividerProps } from './Divider.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Visual separator line between content sections.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Separating content sections vertically',
    'Vertical divider between inline items',
    'Separating form field groups',
    'Sidebar section separators',
    'Footer separation from main content',
  ],
  bad: [
    "Menu item separators (use `{ type: 'separator' }` in Menu items)",
    'Toolbar group separators (use Toolbar.Separator)',
    'Card boundaries (use Card)',
    'Spacing between items (use `gap` on Flex)',
    'Decorative borders (use `borderWidth` style prop)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Divider> = (args: DividerProps) => <Divider {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Divider';

// Initial story props which override the default
const INITIAL_PROPS: DividerProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Divider',
  component: Divider,
  args: { ...DividerDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Divider.test.tsx',
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
        examples={<DividerExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Divider>;
