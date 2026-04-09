import { Button, type ButtonProps } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { useDisclosure } from '../../../hooks';
import { popProps } from '../../../utils';
import { Drawer } from './Drawer';
import { DrawerExamples } from './Drawer.examples';
import { DrawerDefaultProps, type DrawerProps } from './Drawer.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Side panel that slides in for forms, navigation, or supplementary content.`;

// [Optional] Alert text, use for important info
const MESSAGE = `The buttons prop accepts an array of ButtonProps. Supports placement: left, right, top, bottom.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Settings or preference panels',
    'Mobile navigation menus',
    'Detail view alongside a list',
    'Multi-field edit forms',
    'Filter panels for data views',
  ],
  bad: [
    'Short confirmations (use AlertDialog)',
    'Quick 1-2 field forms (use Dialog)',
    'Non-blocking feedback (use toast)',
    'Tooltip-like information (use Popover)',
    'Inline content expansion (use Collapsible)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Drawer> = (args: DrawerProps) => (
  <DrawerConstructor {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Drawer';

// Initial story props which override the default
const INITIAL_PROPS = {
  title: 'Cart',
};

// Disable props that crash the story when updated (this won't remove them)
const DISABLED_PROPS = {
  // propName: { control: false }
  children: { control: false },
  open: { control: false },
  buttons: { control: false },
};

// Story constructor
export default {
  title: 'Components/Overlay/Drawer',
  component: Drawer,
  args: { ...DrawerDefaultProps, ...INITIAL_PROPS },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Drawer.test.tsx',
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
        examples={<DrawerExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Drawer>;

/* --- [ CUSTOM RENDERING ] --- */

const DrawerConstructor: FC<DrawerProps> = ({ ...args }) => {
  const { otherProps } = popProps(args, ['isOpen', 'onClose']);
  const { open, onToggle } = useDisclosure();

  const drawerButtons: Array<ButtonProps> = [{ children: 'Checkout', onClick: onToggle }];

  return (
    <>
      <Button onClick={onToggle}>Open Drawer</Button>

      <Drawer open={open} onClose={onToggle} buttons={drawerButtons} {...otherProps}>
        Content
      </Drawer>
    </>
  );
};
