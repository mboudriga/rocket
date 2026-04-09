import { Box } from '@components/Layout/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { DatePicker } from './DatePicker';
import { DatePickerExamples } from './DatePicker.examples';
import { DatePickerDefaultProps, type DatePickerProps } from './DatePicker.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Calendar-based date selection for single dates, ranges, or datetimes.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Appointment or event scheduling',
    'Date of birth entry',
    'Date range filters (start/end)',
    'Deadline or due date selection',
    'Datetime selection for meetings',
  ],
  bad: [
    'Time-only selection (use dedicated time input)',
    'Relative date display (use Text)',
    'Year-only selection (use Select)',
    'Numeric age entry (use NumberInput)',
    'Recurring schedule patterns (use custom component)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'tall';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof DatePicker> = (args: DatePickerProps) => (
  <Box maxWidth="280px" width="full">
    <DatePicker {...args} />
  </Box>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'DatePicker';

// Initial story props which override the default
const INITIAL_PROPS: DatePickerProps = {
  label: 'Select a date',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Form/DatePicker',
  component: DatePicker,
  args: { ...DatePickerDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'DatePicker.test.tsx',
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
        examples={<DatePickerExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof DatePicker>;
