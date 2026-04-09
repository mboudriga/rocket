import { Box } from '@components/Layout/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { DataList } from './DataList';
import { DataListExamples } from './DataList.examples';
import { DataListDefaultProps, type DataListProps } from './DataList.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Key-value pair display for detail views and summaries.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'User profile detail views',
    'Order or invoice summaries',
    'Configuration or settings display',
    'API response detail panels',
    'Metadata display sections',
  ],
  bad: [
    'Multi-record tabular data (use Table)',
    'Time-sequenced events (use Timeline)',
    'Editable key-value pairs (use form fields)',
    'Metric summaries with trends (use Stat)',
    'Bulleted lists (use List)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof DataList> = (args: DataListProps) => (
  <Box maxWidth="350px" width="full">
    <DataList {...args} />
  </Box>
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'DataList';

// Initial story props which override the default
const INITIAL_PROPS: DataListProps = {
  items: [
    { label: 'Name', value: 'John Doe' },
    { label: 'Email', value: 'john@example.com' },
    { label: 'Status', value: 'Active', info: 'Last updated today' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/DataList',
  component: DataList,
  args: { ...DataListDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'DataList.test.tsx',
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
        examples={<DataListExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof DataList>;
