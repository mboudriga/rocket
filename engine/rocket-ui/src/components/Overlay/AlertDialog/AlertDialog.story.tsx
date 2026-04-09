import { Button, type ButtonProps } from '@components/Form/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import type { FC } from 'react';
import { StoryTemplate } from '../../../../.storybook';
import vitestResults from '../../../../vitest-results.json';
import { useDisclosure } from '../../../hooks';
import { popProps } from '../../../utils';
import { AlertDialog } from './AlertDialog';
import { AlertDialogExamples } from './AlertDialog.examples';
import { AlertDialogDefaultProps, type AlertDialogProps } from './AlertDialog.types';

/* --- [ DOCUMENTATION ] --- */

const DESCRIPTION = `Confirmation dialog for destructive or irreversible actions.`;

const MESSAGE = `Same API as Dialog. Use for destructive confirmations where the user must explicitly confirm or cancel.`;

const NOTATIONS: Array<string> = [];

const USE = {
  good: [
    'Delete confirmation prompts',
    'Discard unsaved changes warning',
    'Account deactivation confirmation',
    'Bulk action confirmation',
    'Irreversible operation warnings',
  ],
  bad: [
    'Form entry overlays (use Dialog)',
    'Informational content (use Dialog)',
    'Non-blocking feedback (use toast)',
    'Inline warnings (use Alert)',
    'Supplementary content panels (use Drawer)',
  ],
};

/* --- [ IMPLEMENTATION ] --- */

const LAYOUT = 'normal';

export const Component: StoryObj<typeof AlertDialog> = (args: AlertDialogProps) => (
  <AlertDialogConstructor {...args} />
);

Component.storyName = 'AlertDialog';

const INITIAL_PROPS = {
  title: 'Delete Item?',
};

const DISABLED_PROPS = {
  children: { control: false },
  open: { control: false },
  buttons: { control: false },
};

export default {
  title: 'Components/Overlay/AlertDialog',
  component: AlertDialog,
  args: { ...AlertDialogDefaultProps, ...INITIAL_PROPS, onOpenChange: fn() },
  argTypes: { ...DISABLED_PROPS },
  parameters: {
    vitest: {
      testFile: 'AlertDialog.test.tsx',
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
        examples={<AlertDialogExamples />}
      >
        {story()}
      </StoryTemplate>
    ),
  ],
} as Meta<typeof AlertDialog>;

/* --- [ CUSTOM RENDERING ] --- */

const AlertDialogConstructor: FC<AlertDialogProps> = ({ ...args }) => {
  const { otherProps } = popProps(args, ['isOpen', 'onClose']);
  const { open, onToggle } = useDisclosure();

  const alertDialogButtons: Array<ButtonProps> = [
    { children: 'Cancel', variant: 'ghost', colorScheme: 'gray', onClick: onToggle },
    { children: 'Delete', colorPalette: 'red', onClick: onToggle },
  ];

  return (
    <>
      <Button onClick={onToggle}>Delete Item</Button>

      <AlertDialog open={open} onClose={onToggle} buttons={alertDialogButtons} {...otherProps}>
        This action cannot be undone. This will permanently delete the item from your account.
      </AlertDialog>
    </>
  );
};
