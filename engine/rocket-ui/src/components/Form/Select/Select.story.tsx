import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Select } from './Select';
import { SelectExamples } from './Select.examples';
import { SelectDefaultProps, type SelectProps } from './Select.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Dropdown list for choosing one option from a predefined set.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange value is a JSON-encoded array. Use JSON.parse(e.target.value)[0] to extract the selected value.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Country or region selection',
    'Category or type filters',
    'Status assignment dropdowns',
    'Role or permission pickers',
    'Sort order selection',
  ],
  bad: [
    'Searchable lists with many options (use Combobox)',
    'Binary on/off choice (use Switch)',
    '2-4 visible options (use RadioGroup or SegmentedControl)',
    'Multiple selections (use Listbox)',
    'Tag-based multi-select (use TagsInput)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Select> = (args: SelectProps) => <Select {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Select';

// Initial story props which override the default
const INITIAL_PROPS: SelectProps = {
  label: 'Framework',
  placeholder: 'Select a framework',
  options: [
    { value: 'select', label: 'Select a framework' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'emberjs', label: 'Ember.js' },
    { value: 'svelte', label: 'Svelte' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  value: { control: false },
  defaultValue: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Select',
  component: Select,
  args: { ...SelectDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Select.test.tsx',
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
        examples={<SelectExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Select>;
