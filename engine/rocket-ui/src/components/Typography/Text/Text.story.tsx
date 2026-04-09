import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Text } from './Text';
import { TextExamples } from './Text.examples';
import { TextDefaultProps, type TextProps } from './Text.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Body text with size, weight, color, truncation, and line clamping.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Body paragraphs and descriptions',
    'Secondary or helper text',
    'Inline labels and captions',
    'Truncated overflow text',
    'Multi-line clamped previews',
  ],
  bad: [
    'Section headings (use Heading)',
    'Inline code snippets (use Code)',
    'Clickable text (use Link)',
    'Keyboard shortcuts display (use Key)',
    'Rich formatted content (use RichTextEditor)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Text> = (args: TextProps) => <Text {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Text';

// Initial story props which override the default
const INITIAL_PROPS: TextProps = {
  children: 'My power level is over 9000!',
  tooltip: "I bet you can't figure out how to get rid of me",
  highlight: {
    query: ['power level', '9000!'],
    styles: { padding: '4px', borderRadius: '2px', background: 'orange.100' },
  },
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  lineClamp: { control: false },
};

// Story constructor
export default {
  title: 'Components/Typography/Text',
  component: Text,
  args: { ...TextDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Text.test.tsx',
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
        examples={<TextExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Text>;
