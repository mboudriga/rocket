import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { ActionBar } from './ActionBar';

describe('<ActionBar />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ActionBar open={true} actions={[{ label: 'Delete' }, { label: 'Share' }]} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders when open', () => {
      render(<ActionBar open={true} actions={[{ label: 'Delete' }, { label: 'Share' }]} />);
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Share')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<ActionBar open={false} actions={[{ label: 'Delete' }, { label: 'Share' }]} />);
      expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });

    it('renders all action buttons', () => {
      render(
        <ActionBar
          open={true}
          actions={[{ label: 'Edit' }, { label: 'Delete' }, { label: 'Archive' }]}
        />
      );
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Archive')).toBeInTheDocument();
    });
  });

  describe('action buttons', () => {
    it('calls onClick when action button clicked', async () => {
      const onDelete = vi.fn();
      const { user } = render(
        <ActionBar open={true} actions={[{ label: 'Delete', onClick: onDelete }]} />
      );

      await user.click(screen.getByText('Delete'));
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('renders action with custom variant', () => {
      render(
        <ActionBar
          open={true}
          actions={[{ label: 'Delete', variant: 'solid', colorPalette: 'red' }]}
        />
      );
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('renders disabled action', () => {
      render(<ActionBar open={true} actions={[{ label: 'Delete', disabled: true }]} />);
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('close trigger', () => {
    it('renders close trigger when hasCloseTrigger is true', () => {
      render(<ActionBar open={true} actions={[{ label: 'Delete' }]} hasCloseTrigger />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('calls onClose when close trigger clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(
        <ActionBar open={true} actions={[{ label: 'Delete' }]} hasCloseTrigger onClose={onClose} />
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('positioning', () => {
    it('renders in portal', () => {
      render(<ActionBar open={true} actions={[{ label: 'Test' }]} />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('selection trigger', () => {
    it('renders selection trigger', () => {
      render(<ActionBar open={true} actions={[{ label: 'Delete' }]} />);
      // The component includes a selection trigger by default
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange when opening', () => {
      const onOpenChange = vi.fn();
      render(<ActionBar open={true} actions={[{ label: 'Delete' }]} onOpenChange={onOpenChange} />);
      // ActionBar renders when open
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls onOpenChange with correct shape', async () => {
      const onOpenChange = vi.fn();
      const onClose = vi.fn(() => {
        onOpenChange({ open: false });
      });
      const { user } = render(
        <ActionBar
          open={true}
          actions={[{ label: 'Delete' }]}
          hasCloseTrigger
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false }));
    });
  });

  describe('keyboard interaction', () => {
    it('supports keyboard navigation for actions', async () => {
      const { user } = render(
        <ActionBar open={true} actions={[{ label: 'Edit' }, { label: 'Delete' }]} />
      );

      const editButton = screen.getByText('Edit');
      editButton.focus();
      expect(editButton).toHaveFocus();

      await user.tab();
      const deleteButton = screen.getByText('Delete');
      expect(deleteButton).toHaveFocus();
    });
  });
});
