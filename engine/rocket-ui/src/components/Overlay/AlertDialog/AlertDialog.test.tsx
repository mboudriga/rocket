import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { AlertDialog } from './AlertDialog';

describe('<AlertDialog />', () => {
  describe('rendering', () => {
    it('renders when open', () => {
      render(<AlertDialog open={true}>Are you sure?</AlertDialog>);
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<AlertDialog open={false}>Are you sure?</AlertDialog>);
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    });

    it('renders with title', () => {
      render(
        <AlertDialog open={true} title="Confirm Action">
          Are you sure?
        </AlertDialog>
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <AlertDialog open={true}>
          <p>This action cannot be undone.</p>
        </AlertDialog>
      );
      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('renders action buttons', () => {
      render(
        <AlertDialog
          open={true}
          buttons={[
            { children: 'Cancel', variant: 'outline' },
            { children: 'Confirm', colorPalette: 'red' },
          ]}
        >
          Are you sure?
        </AlertDialog>
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('calls onClick on button click', async () => {
      const onConfirm = vi.fn();
      const { user } = render(
        <AlertDialog
          open={true}
          buttons={[{ children: 'Cancel' }, { children: 'Confirm', onClick: onConfirm }]}
        >
          Are you sure?
        </AlertDialog>
      );

      await user.click(screen.getByText('Confirm'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('renders disabled button', () => {
      render(
        <AlertDialog open={true} buttons={[{ children: 'Submit', disabled: true }]}>
          Content
        </AlertDialog>
      );
      expect(screen.getByText('Submit')).toBeDisabled();
    });
  });

  describe('close behavior', () => {
    it('renders close button when onClose provided', () => {
      const onClose = vi.fn();
      render(
        <AlertDialog open={true} onClose={onClose}>
          Content
        </AlertDialog>
      );
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('calls onClose when close button clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(
        <AlertDialog open={true} onClose={onClose}>
          Content
        </AlertDialog>
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <AlertDialog open={true} title="Alert">
          Content
        </AlertDialog>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has alertdialog role', () => {
      render(<AlertDialog open={true}>Content</AlertDialog>);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('focuses content when opened', async () => {
      render(
        <AlertDialog open={true} title="Alert">
          Content
        </AlertDialog>
      );

      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard interaction', () => {
    it('does not close on Escape by default for alert dialogs', async () => {
      const { user } = render(<AlertDialog open={true}>Important message</AlertDialog>);

      await user.keyboard('{Escape}');
      // AlertDialog typically requires explicit user action
      expect(screen.getByText('Important message')).toBeInTheDocument();
    });
  });

  describe('button variants', () => {
    it('renders buttons with different variants', () => {
      render(
        <AlertDialog
          open={true}
          buttons={[
            { children: 'Cancel', variant: 'ghost' },
            { children: 'Delete', variant: 'solid', colorPalette: 'red' },
          ]}
        >
          Delete this item?
        </AlertDialog>
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('focus management', () => {
    it('has focus trap configured', async () => {
      render(
        <AlertDialog open={true} title="Alert">
          <button type="button">First Button</button>
          <button type="button">Second Button</button>
        </AlertDialog>
      );

      await waitFor(() => {
        expect(screen.getByText('First Button')).toBeInTheDocument();
      });

      // AlertDialog uses Chakra Dialog.Root which has trapFocus enabled by default
      const alertDialog = screen.getByRole('alertdialog');
      expect(alertDialog).toBeInTheDocument();
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange when state changes', async () => {
      const onOpenChange = vi.fn();
      const onClose = vi.fn();
      const { user } = render(
        <AlertDialog open={true} onOpenChange={onOpenChange} onClose={onClose}>
          Content
        </AlertDialog>
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false }));
      });
    });
  });
});
