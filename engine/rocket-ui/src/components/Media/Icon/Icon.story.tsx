import type { Meta, StoryObj } from '@storybook/react-vite';
import { GiRobotGolem } from 'react-icons/gi';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Icon } from './Icon';
import { IconExamples } from './Icon.examples';
import { IconDefaultProps, type IconProps } from './Icon.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Wrapper for rendering icon components with consistent sizing.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Use Lucide icons with Lu prefix from react-icons/lu.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Inline decorative icons in text',
    'List item icons',
    'Navigation item icons',
    'Custom icon sizing and color',
    'Icon within a Circle container',
  ],
  bad: [
    'Clickable icon actions (use IconButton)',
    'User avatars (use Avatar)',
    'Large images (use Image)',
    'Status badges (use Badge)',
    'Loading indicators (use Spinner)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Icon> = (args: IconProps) => <Icon {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Icon';

// Initial story props which override the default
const INITIAL_PROPS: IconProps = {
  children: <GiRobotGolem />,
  boxSize: '2em',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Media/Icon',
  component: Icon,
  args: { ...IconDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Icon.test.tsx',
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
        examples={<IconExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Icon>;
