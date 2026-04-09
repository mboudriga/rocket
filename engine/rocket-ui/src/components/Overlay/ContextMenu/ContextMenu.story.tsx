import { Box } from '@components/Layout/Box';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { LuCopy, LuPencil, LuShare, LuTrash } from 'react-icons/lu';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { ContextMenu } from './ContextMenu';
import { ContextMenuExamples } from './ContextMenu.examples';
import { ContextMenuDefaultProps, type ContextMenuProps } from './ContextMenu.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Right-click menu for contextual actions on an element.`;

const MESSAGE = `Same item shape as Menu. Supports shortcut property for keyboard hints.`;

const NOTATIONS: Array<string> = [];

const USE = {
  good: [
    'File browser right-click actions',
    'Canvas or workspace context actions',
    'Text editor context operations',
    'Image or media context actions',
    'Table row right-click operations',
  ],
  bad: [
    'Primary action menus (use Menu)',
    'Always-visible actions (use Button or Toolbar)',
    'Mobile-first interfaces (no right-click)',
    'Navigation menus (use Menubar)',
    'Form field interactions (use Select)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'normal';

export const Component: StoryObj<typeof ContextMenu> = (args: ContextMenuProps) => (
  <ContextMenuConstructor {...args} />
);

Component.storyName = 'ContextMenu';

const INITIAL_PROPS = {};

const DISABLED_PROPS = {
  trigger: { control: false },
  items: { control: false },
};

export default {
  title: 'Components/Overlay/ContextMenu',
  component: ContextMenu,
  args: { ...ContextMenuDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'ContextMenu.test.tsx',
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
        examples={<ContextMenuExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof ContextMenu>;

/* --- [ CUSTOM RENDERING ] --- */

const ContextMenuConstructor: FC<ContextMenuProps> = ({ ...args }) => {
  return (
    <ContextMenu
      {...args}
      trigger={
        <Box
          padding="10"
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          textAlign="center"
          cursor="context-menu"
          userSelect="none"
        >
          Right-click here to open menu
        </Box>
      }
      items={[
        { value: 'edit', label: 'Edit', icon: <LuPencil />, shortcut: 'Ctrl+E' },
        { value: 'copy', label: 'Copy', icon: <LuCopy />, shortcut: 'Ctrl+C' },
        { value: 'share', label: 'Share', icon: <LuShare /> },
        { value: 'delete', label: 'Delete', icon: <LuTrash />, shortcut: 'Del' },
      ]}
    />
  );
};
