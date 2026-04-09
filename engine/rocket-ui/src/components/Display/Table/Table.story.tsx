import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Table } from './Table';
import { TableExamples } from './Table.examples';
import { TableDefaultProps, type TableProps } from './Table.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Structured data display in rows and columns with sorting and custom cells.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Data-heavy admin dashboards',
    'User management lists',
    'Transaction or audit logs',
    'Comparison tables',
    'Inventory or product listings',
  ],
  bad: [
    'Simple key-value pairs (use DataList)',
    'Card-based content grids (use Grid + Card)',
    'Single record detail view (use DataList)',
    'Timeline of events (use Timeline)',
    'Simple bulleted content (use List)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'wide';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Table> = (args: TableProps) => <Table {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Table';

// Initial story props which override the default
const INITIAL_PROPS: TableProps = {
  columns: [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
  ],
  data: [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Display/Table',
  component: Table,
  args: { ...TableDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Table.test.tsx',
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
        examples={<TableExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Table>;
