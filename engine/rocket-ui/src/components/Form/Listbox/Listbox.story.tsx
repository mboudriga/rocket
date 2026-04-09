import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Listbox } from './Listbox';
import { ListboxExamples } from './Listbox.examples';
import { ListboxDefaultProps, type ListboxProps } from './Listbox.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Visible list of selectable items for single or multi-select with optional grouping.`;

// [Optional] Alert text, use for important info
const MESSAGE = `onChange value is a JSON-encoded array. Use JSON.parse(e.target.value) for selections.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Multi-select feature lists',
    'Permission assignment panels',
    'Grouped category selection',
    'Transfer list source or target',
    'Filterable option lists in settings',
  ],
  bad: [
    'Single select with many options (use Select)',
    'Searchable selection (use Combobox)',
    'Compact inline toggle (use Checkbox)',
    'Display-only lists (use List)',
    'Mutually exclusive choice (use RadioGroup)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Listbox> = (args: ListboxProps) => <Listbox {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Listbox';

// Initial story props which override the default
const INITIAL_PROPS: ListboxProps = {
  label: 'Framework',
  items: [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ],
  defaultValue: ['react'],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  value: { control: false },
  defaultValue: { control: false },
};

// Story constructor
export default {
  title: 'Components/Form/Listbox',
  component: Listbox,
  args: { ...ListboxDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Listbox.test.tsx',
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
        examples={<ListboxExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Listbox>;
