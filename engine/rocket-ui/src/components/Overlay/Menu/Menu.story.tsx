import { Button } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LuCopy, LuPencil, LuTrash2 } from 'react-icons/lu';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Menu } from './Menu';
import { MenuExamples } from './Menu.examples';
import { MenuDefaultProps, type MenuProps } from './Menu.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Dropdown action menu triggered by a button or icon.`;

// [Optional] Alert text, use for important info
const MESSAGE = `Menu has NO onSelect prop. Use onClick on each item individually.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Table row action menus',
    'Kebab or more-options menus',
    'User profile dropdown actions',
    'File or edit action menus',
    'Batch operation selection',
  ],
  bad: [
    'Navigation between pages (use Tabs or Link)',
    'Form value selection (use Select)',
    'Right-click context actions (use ContextMenu)',
    'Hoverable information (use Tooltip)',
    'Multi-level navigation (use Menubar)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Menu> = (args: MenuProps) => (
  <Menu {...args} trigger={<Button>Open Menu</Button>} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Menu';

// Initial story props which override the default
const INITIAL_PROPS: MenuProps = {
  items: [
    { value: 'edit', label: 'Edit', icon: <LuPencil /> },
    { value: 'copy', label: 'Copy', icon: <LuCopy /> },
    { value: 'delete', label: 'Delete', icon: <LuTrash2 /> },
  ],
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
};

// Story constructor
export default {
  title: 'Components/Overlay/Menu',
  component: Menu,
  args: { ...MenuDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Menu.test.tsx',
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
        examples={<MenuExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Menu>;
