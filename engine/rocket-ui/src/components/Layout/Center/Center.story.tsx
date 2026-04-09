import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Center } from './Center';
import { CenterExamples } from './Center.examples';
import { CenterDefaultProps, type CenterProps } from './Center.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Centers its child both horizontally and vertically.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Loading spinners in empty containers',
    'Login or auth page centering',
    'Empty state placeholder centering',
    'Hero content centering',
    'Icon centering inside fixed-size containers',
  ],
  bad: [
    'Multi-item layouts (use Flex)',
    'Aligning items to one side (use Flex)',
    'Grid-based layouts (use Grid)',
    'Full-page layouts with sidebar (use Flex)',
    'Centering inside a circle (use Circle)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Center> = (args: CenterProps) => <Center {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Center';

// Initial story props which override the default
const INITIAL_PROPS: CenterProps = {
  children: 'Meet me in the middle',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Layout/Center',
  component: Center,
  args: { ...CenterDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Center.test.tsx',
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
        examples={<CenterExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Center>;
