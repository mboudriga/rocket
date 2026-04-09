import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Flex } from './Flex';
import { FlexExamples } from './Flex.examples';
import { FlexDefaultProps, type FlexProps } from './Flex.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `One-dimensional flexbox layout with \`Flex.V\` and \`Flex.H\` sub-components. Supports the polymorphic \`as\` prop for semantic HTML.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Check out the 'Documentation/Usage/Using Flex' documentation above for more.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = ['V', 'H'];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Horizontal or vertical item arrangement',
    'Header layouts with logo and actions',
    'Form field rows with consistent spacing',
    'Button groups aligned to one side',
    'Navbar with three-zone pattern',
  ],
  bad: [
    'Two-dimensional grid layouts (use Grid)',
    'Multi-column card grids (use Grid)',
    'Centering a single element (use Center)',
    'Resizable split panels (use Splitter)',
    'Wrapping tags or badges (use Wrap)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Flex> = (args: FlexProps) => (
  <Flex justifyContent="center" {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Flex';

// Initial story props which override the default
const INITIAL_PROPS: FlexProps = {
  children: 'Check out what I can do below!',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Flex',
  component: Flex,
  args: { ...FlexDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Flex.test.tsx',
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
        examples={<FlexExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Flex>;
