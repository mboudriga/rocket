import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Image } from '../Image';
import { AspectRatio } from './AspectRatio';
import { AspectRatioExamples } from './AspectRatio.examples';
import { AspectRatioDefaultProps, type AspectRatioProps } from './AspectRatio.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Constrains child content to a fixed width-to-height ratio.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Video embed containers (16:9)',
    'Square image thumbnails (1:1)',
    'Map embed containers',
    'Consistent card image heights',
    'Social media preview images',
  ],
  bad: [
    'Unconstrained images (use Image)',
    'Text content (use Box)',
    'User avatars (use Avatar)',
    'Icons (use Icon)',
    'Flexible-height content (use Box)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof AspectRatio> = (args: AspectRatioProps) => (
  <AspectRatio {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'AspectRatio';

// Initial story props which override the default
const INITIAL_PROPS: AspectRatioProps = {
  children: <Image src="https://picsum.photos/200/200" alt="" />,
  ratio: 4 / 3,
  maxWidth: '300px',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Media/AspectRatio',
  component: AspectRatio,
  args: { ...AspectRatioDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'AspectRatio.test.tsx',
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
        examples={<AspectRatioExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof AspectRatio>;
