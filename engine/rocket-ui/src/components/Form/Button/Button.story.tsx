import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Button } from './Button';
import { ButtonExamples } from './Button.examples';
import { ButtonDefaultProps, type ButtonProps } from './Button.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Triggers actions like form submissions, opening overlays, or confirming operations.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Form submissions and primary actions',
    'Opening overlays or dialogs',
    'Confirming destructive actions',
    'CTA navigation to key destinations',
    'Toggling sidebar visibility',
  ],
  bad: [
    'Navigating via URL (use Link)',
    'Icon-only actions without text (use IconButton)',
    'Displaying status information (use Badge)',
    'Toggling on/off state (use Switch)',
    'Selecting between options (use SegmentedControl)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Button> = (args: ButtonProps) => <Button {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Button';

// Initial story props which override the default
const INITIAL_PROPS: ButtonProps = {
  children: 'Button',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  onClick: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Button',
  component: Button,
  args: { ...ButtonDefaultProps, ...INITIAL_PROPS, onClick: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Button.test.tsx',
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
        examples={<ButtonExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Button>;
