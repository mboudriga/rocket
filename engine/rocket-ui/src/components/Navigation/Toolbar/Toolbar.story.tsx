import type { Meta, StoryObj } from '@storybook/react-vite';
import { type FC, useState } from 'react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuExternalLink,
  LuItalic,
  LuRedo,
  LuUnderline,
  LuUndo,
} from 'react-icons/lu';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { Toolbar } from './Toolbar';
import { ToolbarExamples } from './Toolbar.examples';
import { ToolbarDefaultProps, type ToolbarProps } from './Toolbar.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Grouped action bar for related icon buttons and controls.`;

const MESSAGE = ``;

const NOTATIONS: Array<string> = ['Button', 'ToggleGroup', 'ToggleItem', 'Separator', 'Link'];

const USE = {
  good: [
    'Text formatting toolbars',
    'Image editing action bars',
    'Document action toolbars',
    'Map or canvas control bars',
    'Media player controls',
  ],
  bad: [
    'Navigation menus (use Menubar)',
    'Page headers (use Flex.H)',
    'Form action buttons (use Flex.H + Button)',
    'Selection-based actions (use ActionBar)',
    'Tab navigation (use Tabs)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'normal';

export const Component: StoryObj<typeof Toolbar> = (args: ToolbarProps) => (
  <ToolbarConstructor {...args} />
);

Component.storyName = 'Toolbar';

const INITIAL_PROPS = {};

const DISABLED_PROPS = {
  children: { control: false },
};

export default {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  args: { ...ToolbarDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Toolbar.test.tsx',
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
        examples={<ToolbarExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Toolbar>;

/* --- [ CUSTOM RENDERING ] --- */

const ToolbarConstructor: FC<ToolbarProps> = ({ ...args }) => {
  const [textFormat, setTextFormat] = useState<Array<string>>([]);
  const [alignment, setAlignment] = useState('left');

  return (
    <Toolbar {...args}>
      <Toolbar.Button icon={<LuUndo />} label="Undo" onClick={() => alert('Undo')} />
      <Toolbar.Button icon={<LuRedo />} label="Redo" onClick={() => alert('Redo')} />

      <Toolbar.Separator />

      <Toolbar.ToggleGroup
        type="multiple"
        value={textFormat}
        onValueChange={(value) => setTextFormat(value as Array<string>)}
      >
        <Toolbar.ToggleItem value="bold" icon={<LuBold />} label="Bold" />
        <Toolbar.ToggleItem value="italic" icon={<LuItalic />} label="Italic" />
        <Toolbar.ToggleItem value="underline" icon={<LuUnderline />} label="Underline" />
      </Toolbar.ToggleGroup>

      <Toolbar.Separator />

      <Toolbar.ToggleGroup
        type="single"
        value={alignment}
        onValueChange={(value) => setAlignment(value as string)}
      >
        <Toolbar.ToggleItem value="left" icon={<LuAlignLeft />} label="Align Left" />
        <Toolbar.ToggleItem value="center" icon={<LuAlignCenter />} label="Align Center" />
        <Toolbar.ToggleItem value="right" icon={<LuAlignRight />} label="Align Right" />
      </Toolbar.ToggleGroup>

      <Toolbar.Separator />

      <Toolbar.Link href="https://example.com" icon={<LuExternalLink />} label="External Link" />
    </Toolbar>
  );
};
