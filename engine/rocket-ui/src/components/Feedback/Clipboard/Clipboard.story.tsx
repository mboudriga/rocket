import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Clipboard } from './Clipboard';
import { ClipboardExamples } from './Clipboard.examples';
import { ClipboardDefaultProps, type ClipboardProps } from './Clipboard.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Copy-to-clipboard component with button and feedback state.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'API key or token copy buttons',
    'Share link copy actions',
    'Code snippet copy buttons',
    'Reference number copy',
    'Configuration value copy',
  ],
  bad: [
    'Text editing (use Input or Editable)',
    'File copying (use custom implementation)',
    'Multi-field copy (use custom implementation)',
    'Paste detection (use Input)',
    'Display-only content (use Text or Code)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Clipboard> = (args: ClipboardProps) => (
  <Clipboard {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Clipboard';

// Initial story props which override the default
const INITIAL_PROPS: ClipboardProps = {
  value: 'https://example.com',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Feedback/Clipboard',
  component: Clipboard,
  args: { ...ClipboardDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Clipboard.test.tsx',
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
        examples={<ClipboardExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Clipboard>;
