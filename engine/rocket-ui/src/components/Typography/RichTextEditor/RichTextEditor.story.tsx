import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { RichTextEditor } from './RichTextEditor';
import { RichTextEditorExamples } from './RichTextEditor.examples';
import { RichTextEditorDefaultProps, type RichTextEditorProps } from './RichTextEditor.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Tiptap-based WYSIWYG editor with customizable toolbar and chat mode.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Use useRichTextEditor hook for programmatic control. Supports enterToSend for chat mode.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [
  'Toolbar',
  'ControlGroup',
  'Separator',
  'Content',
  'Footer',
  'Control',
];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Blog post or article editing',
    'Email composition',
    'Chat message input with formatting',
    'Comment or review writing',
    'Documentation or wiki editing',
  ],
  bad: [
    'Plain text entry (use Textarea)',
    'Single-line text (use Input)',
    'Code editing (use dedicated code editor)',
    'Markdown source editing (use Textarea)',
    'Read-only formatted display (use HTML rendering)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof RichTextEditor> = (args: RichTextEditorProps) => (
  <RichTextEditor {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'RichTextEditor';

// Initial story props which override the default
const INITIAL_PROPS: Partial<RichTextEditorProps> = {
  label: 'Content',
  placeholder: 'Write something amazing...',
  showCharacterCount: true,
  characterLimit: 500,
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  children: { control: false },
  onSend: { control: false },
};

// Story constructor
export default {
  title: 'Components/Typography/RichTextEditor',
  component: RichTextEditor,
  args: { ...RichTextEditorDefaultProps, ...INITIAL_PROPS, onSend: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'RichTextEditor.test.tsx',
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
        examples={<RichTextEditorExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof RichTextEditor>;
