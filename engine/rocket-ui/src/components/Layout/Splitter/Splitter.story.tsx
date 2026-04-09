import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Box } from '../Box';
import { Splitter } from './Splitter';
import { SplitterExamples } from './Splitter.examples';
import { SplitterDefaultProps, type SplitterProps } from './Splitter.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Resizable split panels with a drag handle.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'IDE-style editor + preview layout',
    'Email list + reading pane',
    'Sidebar with resizable width',
    'Comparison views side by side',
    'Code editor + terminal split',
  ],
  bad: [
    'Simple sidebar layout (use Flex)',
    'Responsive column layouts (use Grid)',
    'Tabbed content (use Tabs)',
    'Accordion-style expand/collapse (use Accordion)',
    'Fixed-ratio layouts (use Flex with `flex` prop)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Splitter> = (args: SplitterProps) => (
  <Box height="200px" width="100%">
    <Splitter {...args} />
  </Box>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Splitter';

// Initial story props which override the default
const INITIAL_PROPS: SplitterProps = {
  panels: [
    {
      id: 'left',
      defaultSize: 30,
      children: (
        <Box bg="gray.100" p="4" height="100%">
          Left Panel
        </Box>
      ),
    },
    {
      id: 'right',
      defaultSize: 70,
      children: (
        <Box bg="gray.200" p="4" height="100%">
          Right Panel
        </Box>
      ),
    },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Splitter',
  component: Splitter,
  args: { ...SplitterDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Splitter.test.tsx',
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
        examples={<SplitterExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Splitter>;
