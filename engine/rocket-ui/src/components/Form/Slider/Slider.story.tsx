import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Box } from '../../Layout/Box';
import { Slider } from './Slider';
import { SliderExamples } from './Slider.examples';
import { SliderDefaultProps, type SliderProps } from './Slider.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Draggable range input for selecting numeric values or ranges.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange value is a JSON-encoded array. Use JSON.parse(e.target.value)[0] for single value, or destructure for range.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Volume or brightness controls',
    'Price range filters',
    'Image crop adjustments',
    'Rating or satisfaction scales',
    'Percentage or progress input',
  ],
  bad: [
    'Precise numeric entry (use NumberInput)',
    'Date range selection (use DatePicker)',
    'Star-based rating (use Rating)',
    'Discrete option selection (use SegmentedControl)',
    'Large range with specific values (use NumberInput)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Slider> = (args: SliderProps) => (
  <Box width="100%">
    <Slider {...args} />
  </Box>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Slider';

// Initial story props which override the default
const INITIAL_PROPS: SliderProps = {
  label: 'Volume',
  defaultValue: [50],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Slider',
  component: Slider,
  args: { ...SliderDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Slider.test.tsx',
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
        examples={<SliderExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Slider>;
