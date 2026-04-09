import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { ColorSwatch } from './ColorSwatch';
import { ColorSwatchExamples } from './ColorSwatch.examples';
import { ColorSwatchDefaultProps, type ColorSwatchProps } from './ColorSwatch.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Small color preview circle for displaying color values.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Color palette display',
    'Theme color preview',
    'Product color options',
    'Design token visualization',
    'Color picker current value display',
  ],
  bad: [
    'Color selection input (use ColorPicker)',
    'Status indicators (use Badge)',
    'Decorative circles (use Circle)',
    'Icon display (use Icon)',
    'Avatar placeholder (use Avatar)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof ColorSwatch> = (args: ColorSwatchProps) => (
  <ColorSwatch {...args} value="#3182ce" />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'ColorSwatch';

// Initial story props which override the default
const INITIAL_PROPS: ColorSwatchProps = {
  value: '#3182ce',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/ColorSwatch',
  component: ColorSwatch,
  args: { ...ColorSwatchDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ColorSwatch.test.tsx',
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
        examples={<ColorSwatchExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ColorSwatch>;
