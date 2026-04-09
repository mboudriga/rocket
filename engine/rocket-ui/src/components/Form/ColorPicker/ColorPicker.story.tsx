import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { ColorPicker } from './ColorPicker';
import { ColorPickerExamples } from './ColorPicker.examples';
import { ColorPickerDefaultProps, type ColorPickerProps } from './ColorPicker.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Color selection input with swatch, spectrum, and value editing.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Theme or brand color customization',
    'Background color settings',
    'Text color selection',
    'Chart or graph color assignment',
    'Product color variant selection',
  ],
  bad: [
    'Predefined color choice from a list (use Select)',
    'Color-coded status display (use Badge)',
    'Color preview only (use ColorSwatch)',
    'Theme mode toggle (use Switch)',
    'Palette selection from presets (use RadioGroup)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof ColorPicker> = (args: ColorPickerProps) => (
  <ColorPicker {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'ColorPicker';

// Initial story props which override the default
const INITIAL_PROPS: ColorPickerProps = {
  label: 'Choose a color',
  defaultValue: '#3182ce',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/ColorPicker',
  component: ColorPicker,
  args: { ...ColorPickerDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ColorPicker.test.tsx',
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
        examples={<ColorPickerExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ColorPicker>;
