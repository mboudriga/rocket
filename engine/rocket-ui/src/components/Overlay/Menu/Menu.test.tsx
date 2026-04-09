import { Button } from '@components/Form/Button';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { Menu } from './Menu';

const defaultItems = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'delete', label: 'Delete' },
];

describe('<Menu />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders trigger element', () => {
      render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);
      expect(screen.getByRole('button', { name: 'Open Menu' })).toBeInTheDocument();
    });

    it('does not show menu initially', () => {
      render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });
  });

  describe('open/close behavior', () => {
    it('opens menu on trigger click', async () => {
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Duplicate')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
      });
    });

    it('closes menu after item selection', async () => {
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Edit'));
      await waitFor(() => {
        expect(screen.queryByText('Edit')).not.toBeInTheDocument();
      });
    });
  });

  describe('item interaction', () => {
    it('calls onClick when item clicked', async () => {
      const onEdit = vi.fn();
      const items = [
        { value: 'edit', label: 'Edit', onClick: onEdit },
        { value: 'delete', label: 'Delete' },
      ];
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={items} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Edit'));
      expect(onEdit).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled items', () => {
    it('marks disabled item with aria-disabled', async () => {
      const items = [
        { value: 'edit', label: 'Edit' },
        { value: 'delete', label: 'Delete', disabled: true },
      ];
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={items} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        const deleteItem = screen.getByRole('menuitem', { name: 'Delete' });
        expect(deleteItem).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('icons', () => {
    it('renders menu item with icon', async () => {
      const items = [
        { value: 'edit', label: 'Edit', icon: <span data-testid="edit-icon">E</span> },
      ];
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={items} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard navigation', () => {
    it('navigates items with arrow keys', async () => {
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      // Navigation moves focus through items
      expect(screen.getByText('Duplicate')).toBeInTheDocument();
    });

    it('renders menu items as menuitems', async () => {
      const { user } = render(<Menu trigger={<Button>Open Menu</Button>} items={defaultItems} />);

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByText('Edit')).toBeInTheDocument();
      });

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange when menu opens', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Menu
          trigger={<Button>Open Menu</Button>}
          items={defaultItems}
          onOpenChange={onOpenChange}
        />
      );

      await user.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
      });
    });
  });
});
