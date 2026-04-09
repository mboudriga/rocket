import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Avatar } from './Avatar';
import { AvatarExamples } from './Avatar.examples';
import { AvatarDefaultProps, type AvatarProps } from './Avatar.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `User avatar with image, initials fallback, and size variants.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'User profile pictures',
    'Comment author avatars',
    'Team member thumbnails',
    'Chat participant icons',
    'Account menu triggers',
  ],
  bad: [
    'Generic images (use Image)',
    'Icon display (use Icon)',
    'Logo display (use Image)',
    'Decorative circles (use Circle)',
    'Status indicators (use Badge + Circle)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Avatar> = (args: AvatarProps) => <Avatar {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Avatar';

// Initial story props which override the default
const INITIAL_PROPS: AvatarProps = {
  src: 'https://i.pravatar.cc/300',
  name: 'Bob Smith',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Media/Avatar',
  component: Avatar,
  args: { ...AvatarDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Avatar.test.tsx',
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
        examples={<AvatarExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Avatar>;
