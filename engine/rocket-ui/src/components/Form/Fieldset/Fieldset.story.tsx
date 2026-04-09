import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Input } from '../Input/Input';
import { Fieldset } from './Fieldset';
import { FieldsetExamples } from './Fieldset.examples';
import { FieldsetDefaultProps, type FieldsetProps } from './Fieldset.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Groups related form fields with a legend, helper text, and error text.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Grouping personal info fields',
    'Grouping address fields',
    'Grouping payment method fields',
    'Settings section boundaries',
    'Multi-step form sections',
  ],
  bad: [
    'Single field labeling (use Input label prop)',
    'Page section headings (use Heading)',
    'Card-based grouping (use Card)',
    'Accordion content grouping (use Accordion)',
    'Tab panel boundaries (use Tabs)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Fieldset> = (args: FieldsetProps) => (
  <Fieldset {...args}>
    <Input label="Name" placeholder="Enter name" />
    <Input label="Email" placeholder="Enter email" />
  </Fieldset>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Fieldset';

// Initial story props which override the default
const INITIAL_PROPS: FieldsetProps = {
  legend: 'Contact Information',
  helperText: "We'll never share your info",
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/Fieldset',
  component: Fieldset,
  args: { ...FieldsetDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Fieldset.test.tsx',
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
        examples={<FieldsetExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Fieldset>;
