import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Image } from './Image';
import { ImageExamples } from './Image.examples';
import { ImageDefaultProps, type ImageProps } from './Image.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Optimized image element with alt text and loading fallback.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Content images and photos',
    'Product thumbnails',
    'Hero banner images',
    'Gallery items',
    'Logo or brand images',
  ],
  bad: [
    'User avatars (use Avatar)',
    'Icons (use Icon with Lucide)',
    'Background decoration (use Box with bg)',
    'Aspect-locked thumbnails without container (use AspectRatio + Image)',
    'SVG icons (use Icon)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Image> = (args: ImageProps) => <Image {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Image';

// Initial story props which override the default
const INITIAL_PROPS: ImageProps = {
  src: 'https://picsum.photos/200/200',
  alt: 'Sample image',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Media/Image',
  component: Image,
  args: { ...ImageDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Image.test.tsx',
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
        examples={<ImageExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Image>;
