import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { FieldWrapper } from './FieldWrapper';
import { FieldWrapperExamples } from './FieldWrapper.examples';
import { FieldWrapperDefaultProps, type FieldWrapperProps } from './FieldWrapper.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Standalone wrapper that adds label, hint, and error to custom form elements.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Built-in form components already include FieldWrapper props. Only use this for wrapping non-Rocket custom inputs.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Wrapping third-party form components',
    'Custom input implementations',
    'Wrapping native HTML elements',
    'Complex composite field groups',
    'Custom file or media inputs',
  ],
  bad: [
    'Wrapping Rocket UI inputs (already built in)',
    'Non-form content labeling (use Heading + Text)',
    'Fieldset-level grouping (use Fieldset)',
    'Error-only display (use Alert)',
    'Standalone label without input (use Text)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof FieldWrapper> = (args: FieldWrapperProps) => (
  <FieldWrapper {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'FieldWrapper';

// Initial story props which override the default
const INITIAL_PROPS: FieldWrapperProps = {
  label: 'Label',
  hint: 'Try to input an error',
  children: 'NewFormComponent',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/FieldWrapper',
  component: FieldWrapper,
  args: { ...FieldWrapperDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'FieldWrapper.test.tsx',
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
        examples={<FieldWrapperExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof FieldWrapper>;
