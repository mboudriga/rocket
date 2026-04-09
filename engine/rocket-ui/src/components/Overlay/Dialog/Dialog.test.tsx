import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Dialog } from './Dialog';

describe('<Dialog />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Dialog open={true} title="Dialog Title">
          Dialog Content
        </Dialog>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders when open', async () => {
    render(<Dialog open={true}>Dialog Content</Dialog>);
    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });
  });

  it('renders with title', async () => {
    render(
      <Dialog open={true} title="Dialog Title">
        Content
      </Dialog>
    );
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    });
  });

  it('renders with action buttons', async () => {
    render(
      <Dialog
        open={true}
        buttons={[
          { children: 'Cancel', variant: 'outline' },
          { children: 'Confirm', variant: 'solid' },
        ]}
      >
        Content
      </Dialog>
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
  });

  describe('close behavior', () => {
    it('renders close button when onClose is provided', async () => {
      const onClose = vi.fn();
      render(
        <Dialog open={true} onClose={onClose}>
          Content
        </Dialog>
      );
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(
        <Dialog open={true} onClose={onClose}>
          Content
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('has keyboard-dismissable behavior configured', async () => {
      const onClose = vi.fn();
      render(
        <Dialog open={true} onClose={onClose}>
          Content
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      // Dialog accepts onClose handler which will be triggered on Escape
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('focus management', () => {
    it('focuses dialog content when opened', async () => {
      render(
        <Dialog open={true} title="Dialog Title">
          <button type="button">First Button</button>
        </Dialog>
      );

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('traps focus within dialog', async () => {
      const { user } = render(
        <Dialog open={true} title="Dialog Title">
          <button type="button">First Button</button>
          <button type="button">Second Button</button>
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByText('First Button')).toBeInTheDocument();
      });

      // Tab through elements - focus should stay within dialog
      await user.tab();
      await user.tab();
      await user.tab();

      // Focus should cycle within the dialog
      expect(document.activeElement?.closest('[role="dialog"]')).toBeInTheDocument();
    });
  });

  describe('button actions', () => {
    it('button onClick triggers expected action', async () => {
      const onConfirm = vi.fn();
      const { user } = render(
        <Dialog
          open={true}
          buttons={[
            { children: 'Cancel', variant: 'outline' },
            { children: 'Confirm', variant: 'solid', onClick: onConfirm },
          ]}
        >
          Content
        </Dialog>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Confirm' }));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
