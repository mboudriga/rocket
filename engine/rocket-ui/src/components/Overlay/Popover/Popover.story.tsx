import { Button } from '@components/Form/Button';
import { Text } from '@components/Typography/Text';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Popover } from './Popover';
import { PopoverExamples } from './Popover.examples';
import { PopoverDefaultProps, type PopoverProps } from './Popover.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Click-triggered floating panel for forms, settings, or rich content.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Quick edit forms (1-2 fields)',
    'Color or date mini-pickers',
    'Filter configuration panels',
    'Rich information cards',
    'Inline settings adjustments',
  ],
  bad: [
    'Simple text hints (use Tooltip)',
    'Full forms with many fields (use Dialog)',
    'Navigation menus (use Menu)',
    'Supplementary content panels (use Drawer)',
    'Confirmation prompts (use AlertDialog)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Popover> = (args: PopoverProps) => (
  <Popover {...args} trigger={<Button>Open Popover</Button>}>
    <Text>This is the popover content. You can put any content here.</Text>
  </Popover>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Popover';

// Initial story props which override the default
const INITIAL_PROPS: PopoverProps = {
  title: 'Popover Title',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Overlay/Popover',
  component: Popover,
  args: { ...PopoverDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Popover.test.tsx',
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
        examples={<PopoverExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Popover>;
