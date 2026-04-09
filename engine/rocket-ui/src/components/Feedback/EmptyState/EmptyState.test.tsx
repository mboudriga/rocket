import { LuInbox } from 'react-icons/lu';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';
import { Button } from '../../Form/Button';
import { EmptyState } from './EmptyState';

describe('<EmptyState />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <EmptyState title="No items" description="Add items to get started" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with action button', async () => {
      const { container } = render(
        <EmptyState title="No items" description="Add items to get started">
          <Button>Add Item</Button>
        </EmptyState>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders title', () => {
      render(<EmptyState title="Nothing here" />);
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<EmptyState title="Empty" description="This section has no content" />);
      expect(screen.getByText('This section has no content')).toBeInTheDocument();
    });

    it('renders without description', () => {
      render(<EmptyState title="No data" />);
      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('renders with custom icon', () => {
      render(<EmptyState title="No items" icon={<LuInbox data-testid="inbox-icon" />} />);
      expect(screen.getByTestId('inbox-icon')).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('renders children content', () => {
      render(
        <EmptyState title="No items" description="Add items to get started">
          <Button>Add Item</Button>
        </EmptyState>
      );
      expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
    });

    it('allows interaction with children buttons', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <EmptyState title="No items">
          <Button onClick={onClick}>Add Item</Button>
        </EmptyState>
      );

      await user.click(screen.getByRole('button', { name: 'Add Item' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders with size="%s"', (size) => {
      render(<EmptyState title="Empty" size={size} />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });
  });
});
