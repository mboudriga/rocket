import { Button } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Tooltip } from './Tooltip';
import { TooltipExamples } from './Tooltip.examples';
import { TooltipDefaultProps, type TooltipProps } from './Tooltip.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Hover-triggered hint for describing UI elements.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Icon button action descriptions',
    'Truncated text full content reveal',
    'Disabled button reason explanation',
    'Abbreviation or jargon definitions',
    'Keyboard shortcut hints',
  ],
  bad: [
    'Interactive or clickable content (use Popover)',
    'Rich content with images (use HoverCard)',
    'Form validation errors (use Input error prop)',
    'Essential information users must see (use Alert)',
    'Multi-paragraph help text (use Popover)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Tooltip> = (args: TooltipProps) => (
  <Tooltip {...args} trigger={<Button variant="outline">Hover me</Button>} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Tooltip';

// Initial story props which override the default
const INITIAL_PROPS: TooltipProps = {
  children: 'Hello!',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip,
  args: { ...TooltipDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Tooltip.test.tsx',
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
        examples={<TooltipExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Tooltip>;
