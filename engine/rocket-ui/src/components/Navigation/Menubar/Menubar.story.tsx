import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import {
  LuClipboard,
  LuCopy,
  LuFile,
  LuFolderOpen,
  LuRedo,
  LuSave,
  LuScissors,
  LuUndo,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Menubar } from './Menubar';
import { MenubarExamples } from './Menubar.examples';
import { MenubarDefaultProps, type MenubarProps } from './Menubar.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Horizontal bar with dropdown menus (File, Edit, View style). For desktop application patterns.`;

const MESSAGE = `Hover over other menu triggers while a menu is open to switch between menus.`;

const NOTATIONS: Array<string> = [];

const USE = {
  good: [
    'Desktop application UI',
    'Editor interfaces',
    'Complex applications with many commands',
    'Spreadsheet application headers',
    'Rich text editor menu bars',
    'IDE-style command menus',
  ],
  bad: [
    'Mobile interfaces',
    'Simple navigation (use regular Menu)',
    'Website navigation (use Nav pattern)',
    'Single dropdown menu (use Menu)',
    'Toolbar with icon actions (use Toolbar)',
    'Tab-based navigation (use Tabs)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'normal';

export const Component: StoryObj<typeof Menubar> = (args: MenubarProps) => (
  <MenubarConstructor {...args} />
);

Component.storyName = 'Menubar';

const INITIAL_PROPS = {};

const DISABLED_PROPS = {
  menus: { control: false },
};

export default {
  title: 'Components/Navigation/Menubar',
  component: Menubar,
  args: { ...MenubarDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Menubar.test.tsx',
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
        examples={<MenubarExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Menubar>;

/* --- [ CUSTOM RENDERING ] --- */

const MenubarConstructor: FC<MenubarProps> = ({ ...args }) => {
  const menus = [
    {
      label: 'File',
      items: [
        { value: 'new', label: 'New File', icon: <LuFile />, shortcut: 'Ctrl+N' },
        { value: 'open', label: 'Open...', icon: <LuFolderOpen />, shortcut: 'Ctrl+O' },
        { value: 'save', label: 'Save', icon: <LuSave />, shortcut: 'Ctrl+S' },
        { value: 'save-as', label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { value: 'undo', label: 'Undo', icon: <LuUndo />, shortcut: 'Ctrl+Z' },
        { value: 'redo', label: 'Redo', icon: <LuRedo />, shortcut: 'Ctrl+Y' },
        { value: 'cut', label: 'Cut', icon: <LuScissors />, shortcut: 'Ctrl+X' },
        { value: 'copy', label: 'Copy', icon: <LuCopy />, shortcut: 'Ctrl+C' },
        { value: 'paste', label: 'Paste', icon: <LuClipboard />, shortcut: 'Ctrl+V' },
      ],
    },
    {
      label: 'View',
      items: [
        { value: 'zoom-in', label: 'Zoom In', icon: <LuZoomIn />, shortcut: 'Ctrl++' },
        { value: 'zoom-out', label: 'Zoom Out', icon: <LuZoomOut />, shortcut: 'Ctrl+-' },
        { value: 'reset-zoom', label: 'Reset Zoom', shortcut: 'Ctrl+0' },
      ],
    },
  ];

  return <Menubar {...args} menus={menus} />;
};
