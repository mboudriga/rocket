import { Button, type ButtonProps } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { FC } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { useDisclosure } from '../../../hooks';
import { popProps } from '../../../utils';
import { Dialog } from './Dialog';
import { DialogExamples } from './Dialog.examples';
import { DialogDefaultProps, type DialogProps } from './Dialog.types';

/* --- [ DOCUMENTATION ] --- */

// [Required] What is this component?
const DESCRIPTION = `Focused overlay window that blocks background interaction until dismissed.`;

// [Optional] Alert text, use for important info
const MESSAGE = `The buttons prop accepts an array of ButtonProps. The Button component does not need to be imported.`;

// [Optional] List the components you pass as notations
const NOTATIONS: Array<string> = [];

// [Optional] Usage best practice, keep it short and sweet
const USE = {
  good: [
    'Short forms (1-5 fields)',
    'Critical information requiring acknowledgment',
    'Focused task completion',
    'User profile editing overlays',
    'New item creation forms',
  ],
  bad: [
    'Supplementary or reference content (use Drawer)',
    'Quick yes/no confirmation (use AlertDialog)',
    'Non-blocking notifications (use toast)',
    'Inline help text (use Tooltip)',
    'Sidebar navigation (use Drawer)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

// Layout of the component preview: 'normal' | 'tall' | 'wide' | 'full'
const LAYOUT = 'normal';

// Pass Storybook's args to the component, apply story-specific styles here
export const Component: StoryObj<typeof Dialog> = (args: DialogProps) => (
  <DialogConstructor {...args} />
);

// Match the story name to the component name (removes the sidebar sub-folder)
Component.storyName = 'Dialog';

// Initial story props which override the default
const INITIAL_PROPS = {
  title: 'Hello!',
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
  title: 'Components/Overlay/Dialog',
  component: Dialog,
  args: { ...DialogDefaultProps, ...INITIAL_PROPS, onOpenChange: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'Dialog.test.tsx',
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
        examples={<DialogExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof Dialog>;

/* --- [ CUSTOM RENDERING ] --- */

const DialogConstructor: FC<DialogProps> = ({ ...args }) => {
  const { otherProps } = popProps(args, ['isOpen', 'onClose']);
  const { open, onToggle } = useDisclosure();

  const dialogButtons: Array<ButtonProps> = [
    { children: 'Cancel', variant: 'ghost', colorScheme: 'gray', onClick: onToggle },
    { children: 'More info', onClick: onToggle },
  ];

  return (
    <>
      <Button onClick={onToggle}>Open Dialog</Button>

      <Dialog open={open} onClose={onToggle} buttons={dialogButtons} {...otherProps}>
        I have a wealthy prince from an undisclosed nation that needs your help right now. Send
        $10,000 and we will send you a sense of regret. This is a great opportunity for you.
      </Dialog>
    </>
  );
};
