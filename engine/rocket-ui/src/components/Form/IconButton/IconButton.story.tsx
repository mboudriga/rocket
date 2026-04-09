import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MdSettings } from 'react-icons/md';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { IconButton } from './IconButton';
import { IconButtonExamples } from './IconButton.examples';
import { IconButtonDefaultProps, type IconButtonProps } from './IconButton.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Icon-only button for compact actions that require an accessibility label.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Always provide aria-label for accessibility.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Toolbar icon actions (edit, delete, copy)',
    'Close buttons on cards or panels',
    'Table row action triggers',
    'Compact toggle buttons',
    'Floating action buttons',
  ],
  bad: [
    'Actions with descriptive text (use Button)',
    'Navigation links (use Link)',
    'Menu trigger with label text (use Button)',
    'Status indicators (use Badge)',
    'Toggle with label (use Switch)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof IconButton> = (args: IconButtonProps) => (
  <IconButton {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'IconButton';

// Initial story props which override the default
const INITIAL_PROPS: IconButtonProps = {
  'aria-label': 'Settings',
  children: <MdSettings />,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  onClick: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/IconButton',
  component: IconButton,
  args: { ...IconButtonDefaultProps, ...INITIAL_PROPS, onClick: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'IconButton.test.tsx',
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
        examples={<IconButtonExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof IconButton>;
