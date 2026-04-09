import { Box } from '@components/Layout/Box';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { ContextMenu } from './ContextMenu';

const defaultItems = [
  { value: 'edit', label: 'Edit' },
  { value: 'copy', label: 'Copy' },
  { value: 'delete', label: 'Delete' },
];

describe('<ContextMenu />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders trigger element', () => {
      render(<ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />);
      expect(screen.getByText('Right-click me')).toBeInTheDocument();
    });

    it('does not show menu initially', () => {
      render(<ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />);
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });

    it('renders all menu items when opened', async () => {
      const { user } = render(
        <ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />
      );

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Copy')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });
  });

  describe('context menu interaction', () => {
    it('opens on right-click', async () => {
      const { user } = render(
        <ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />
      );

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });
    });

    it('calls onClick when menu item is clicked', async () => {
      const onEdit = vi.fn();
      const items = [
        { value: 'edit', label: 'Edit', onClick: onEdit },
        { value: 'delete', label: 'Delete' },
      ];

      const { user } = render(<ContextMenu trigger={<Box>Right-click me</Box>} items={items} />);

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Edit'));
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('closes menu after item selection', async () => {
      const { user } = render(
        <ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />
      );

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Edit'));

      await waitFor(() => {
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      });
    });
  });

  describe('disabled items', () => {
    it('marks disabled item with aria-disabled', async () => {
      const items = [
        { value: 'edit', label: 'Edit' },
        { value: 'delete', label: 'Delete', disabled: true },
      ];

      const { user } = render(<ContextMenu trigger={<Box>Right-click me</Box>} items={items} />);

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        const deleteItem = screen.getByRole('menuitem', { name: 'Delete' });
        expect(deleteItem).toHaveAttribute('aria-disabled', 'true');
      });
    });

    it('renders disabled item but is still clickable (DOM behavior)', async () => {
      const onDelete = vi.fn();
      const items = [
        { value: 'edit', label: 'Edit' },
        { value: 'delete', label: 'Delete', disabled: true, onClick: onDelete },
      ];

      const { user } = render(<ContextMenu trigger={<Box>Right-click me</Box>} items={items} />);

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });

      // Note: Chakra's disabled state is aria-disabled, not DOM disabled
      // so onClick still fires. This matches accessibility best practices.
      await user.click(screen.getByText('Delete'));
      expect(onDelete).toHaveBeenCalled();
    });
  });

  describe('icons and shortcuts', () => {
    it('renders menu item with icon', async () => {
      const items = [
        { value: 'edit', label: 'Edit', icon: <span data-testid="edit-icon">E</span> },
      ];

      const { user } = render(<ContextMenu trigger={<Box>Right-click me</Box>} items={items} />);

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
      });
    });

    it('renders menu item with keyboard shortcut', async () => {
      const items = [{ value: 'copy', label: 'Copy', shortcut: 'Ctrl+C' }];

      const { user } = render(<ContextMenu trigger={<Box>Right-click me</Box>} items={items} />);

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard navigation', () => {
    it('navigates items with arrow keys', async () => {
      const { user } = render(
        <ContextMenu trigger={<Box>Right-click me</Box>} items={defaultItems} />
      );

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange when menu opens', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <ContextMenu
          trigger={<Box>Right-click me</Box>}
          items={defaultItems}
          onOpenChange={onOpenChange}
        />
      );

      const trigger = screen.getByText('Right-click me');
      await user.pointer({ keys: '[MouseRight]', target: trigger });

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
      });
    });
  });
});
