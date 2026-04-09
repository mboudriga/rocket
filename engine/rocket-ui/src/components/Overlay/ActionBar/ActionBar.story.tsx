import { Button } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';

import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { useDisclosure } from '../../../hooks';
import { popProps } from '../../../utils';
import { ActionBar } from './ActionBar';
import { ActionBarExamples } from './ActionBar.examples';
import { ActionBarDefaultProps, type ActionBarProps } from './ActionBar.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Floating bar that appears when items are selected for bulk actions.`;

// [Optional] Alert text, use for important info
const MESSAGE = ``;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Bulk delete selected items',
    'Batch archive or move operations',
    'Multi-select export actions',
    'Bulk status changes',
    'Selected item count display with actions',
  ],
  bad: [
    'Page-level toolbars (use Toolbar)',
    'Navigation bars (use Flex.H)',
    'Single item actions (use Menu)',
    'Form submission (use Button)',
    'Persistent action bars (use Toolbar)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof ActionBar> = (args: ActionBarProps) => (
  <ActionBarConstructor {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'ActionBar';

// Initial story props which override the default
const INITIAL_PROPS: ActionBarProps = {};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  open: { control: false },
};

// Story constructor
export default {
  title: 'Components/Overlay/ActionBar',
  component: ActionBar,
  args: { ...ActionBarDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ActionBar.test.tsx',
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
        examples={<ActionBarExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ActionBar>;

/* --- [ CUSTOM RENDERING ] --- */

const ActionBarConstructor: FC<ActionBarProps> = ({ ...args }) => {
  const { otherProps } = popProps(args, ['open', 'onClose']);
  const { open, onToggle } = useDisclosure();

  return (
    <>
      <Button onClick={onToggle}>{open ? 'Close' : 'Open'} Action Bar</Button>
      <ActionBar
        open={open}
        onClose={onToggle}
        actions={[
          { label: 'Delete', variant: 'outline' },
          { label: 'Share', variant: 'solid' },
        ]}
        {...otherProps}
      />
    </>
  );
};
