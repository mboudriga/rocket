import type { Meta, StoryObj } from '@storybook/react-vite';
import { HiCheckCircle } from 'react-icons/hi';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { List } from './List';
import { ListExamples } from './List.examples';
import { ListDefaultProps, type ListProps } from './List.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Styled list with optional icons and consistent formatting.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Feature comparison lists (check/cross)',
    'Pricing plan feature lists',
    'Instruction or requirement lists',
    'Navigation link lists',
    'Benefits or highlights display',
  ],
  bad: [
    'Selectable items (use Listbox)',
    'Data with multiple columns (use Table)',
    'Time-sequenced events (use Timeline)',
    'Key-value pairs (use DataList)',
    'Removable items (use TagsInput or Tag)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof List> = (args: ListProps) => <List {...args} />;

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'List';

// Initial story props which override the default
const INITIAL_PROPS: ListProps = {
  children: ['Keys', 'Wallet', 'Phone'],
  icon: <HiCheckCircle />,
  iconColor: 'green.600',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  icon: { control: false },
};

// Story constructor
export default {
  title: 'Components/Display/List',
  component: List,
  args: { ...ListDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'List.test.tsx',
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
        examples={<ListExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof List>;
