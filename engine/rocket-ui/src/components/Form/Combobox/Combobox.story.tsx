import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Combobox } from './Combobox';
import { ComboboxExamples } from './Combobox.examples';
import { ComboboxDefaultProps, type ComboboxProps } from './Combobox.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Searchable dropdown with type-ahead filtering for large option sets.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange value is a JSON-encoded array. Use JSON.parse(e.target.value)[0] to extract the selected value.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'User or member assignment',
    'City or location search',
    'Product search and select',
    'Large list filtering (50+ items)',
    'Autocomplete search fields',
  ],
  bad: [
    'Short lists under 10 items (use Select)',
    'Binary on/off choice (use Switch)',
    '2-4 visible options (use RadioGroup)',
    'Free-form tag entry (use TagsInput)',
    'Date selection (use DatePicker)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Combobox> = (args: ComboboxProps) => <Combobox {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Combobox';

// Initial story props which override the default
const INITIAL_PROPS: ComboboxProps = {
  label: 'Select a framework',
  placeholder: 'Search frameworks...',
  items: [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Combobox',
  component: Combobox,
  args: { ...ComboboxDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Combobox.test.tsx',
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
        examples={<ComboboxExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Combobox>;
