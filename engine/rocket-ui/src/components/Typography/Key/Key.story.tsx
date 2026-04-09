import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Key } from './Key';
import { KeyExamples } from './Key.examples';
import { KeyDefaultProps, type KeyProps } from './Key.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Keyboard key visual indicator styled as a key cap.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Keyboard shortcut documentation',
    'Hotkey combination display',
    'Tutorial key press instructions',
    'Accessibility shortcut references',
    'Menu item keyboard hints',
  ],
  bad: [
    'Inline code snippets (use Code)',
    'Status badges (use Badge)',
    'Button labels (use Button)',
    'Tag labels (use Tag)',
    'General text emphasis (use Text with fontWeight)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Key> = (args: KeyProps) => <Key {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Key';

// Initial story props which override the default
const INITIAL_PROPS: KeyProps = { children: 'Shift' };

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Typography/Key',
  component: Key,
  args: { ...KeyDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Key.test.tsx',
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
        examples={<KeyExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Key>;
