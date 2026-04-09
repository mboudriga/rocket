import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Code } from './Code';
import { CodeExamples } from './Code.examples';
import { CodeDefaultProps, type CodeProps } from './Code.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Inline code snippet with monospace styling.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Inline code references in text',
    'Variable or function names',
    'File paths or commands',
    'API endpoint display',
    'Configuration keys or values',
  ],
  bad: [
    'Multi-line code blocks (use custom CodeBlock)',
    'Keyboard shortcuts (use Key)',
    'Regular emphasized text (use Text with fontWeight)',
    'Status labels (use Badge)',
    'Copy-able values (use Clipboard)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Code> = (args: CodeProps) => <Code {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Code';

// Initial story props which override the default
const INITIAL_PROPS: CodeProps = {
  children: "I don't highlight syntax",
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Typography/Code',
  component: Code,
  args: { ...CodeDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Code.test.tsx',
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
        examples={<CodeExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Code>;
