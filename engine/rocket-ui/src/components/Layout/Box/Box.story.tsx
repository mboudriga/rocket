import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Box } from './Box';
import { BoxExamples } from './Box.examples';
import { BoxDefaultProps, type BoxProps } from './Box.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Base layout primitive that renders a \`div\` with all style props.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Generic container with style props',
    'Wrapper for custom spacing or padding',
    'Semantic element via `as` prop (section, article)',
    'Applying background or border styles',
    'Constraining max-width for page content',
  ],
  bad: [
    'Flexbox layouts (use Flex)',
    'Grid-based layouts (use Grid)',
    'Centering a single child (use Center)',
    'Circular containers (use Circle)',
    'Scrollable overflow regions (use ScrollArea)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Box> = (args: BoxProps) => (
  <Box border="1px solid" padding="8px" {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Box';

// Initial story props which override the default
const INITIAL_PROPS: BoxProps = { children: 'Who you calling a div mate?' };

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Box',
  component: Box,
  args: { ...BoxDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Box.test.tsx',
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
        examples={<BoxExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Box>;
