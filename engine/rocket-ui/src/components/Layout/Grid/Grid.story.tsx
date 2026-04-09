import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Grid } from './Grid';
import { GridExamples } from './Grid.examples';
import { GridDefaultProps, type GridProps } from './Grid.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Two-dimensional CSS Grid layout for rows and columns.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Multi-column card layouts',
    'Dashboard widget grids',
    'Auto-fill responsive galleries',
    'Sidebar + main content page layouts',
    'Form layouts with aligned columns',
  ],
  bad: [
    'Single-row horizontal layout (use Flex.H)',
    'Single-column vertical layout (use Flex.V)',
    'Centering one item (use Center)',
    'Wrapping inline elements (use Wrap)',
    'Resizable panels (use Splitter)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Grid> = (args: GridProps) => <Grid {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Grid';

// Initial story props which override the default
const INITIAL_PROPS: GridProps = {
  children: 'Check out what I can do below!',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Grid',
  component: Grid,
  args: { ...GridDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Grid.test.tsx',
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
        examples={<GridExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Grid>;
