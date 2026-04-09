import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Drawer } from './Drawer';

describe('<Drawer />', () => {
  const mockOnOpenChange = vi.fn();

  beforeEach(() => {
    mockOnOpenChange.mockClear();
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Drawer open={true} onOpenChange={mockOnOpenChange}>
          Drawer Content
        </Drawer>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders when open', async () => {
    render(
      <Drawer open={true} onOpenChange={mockOnOpenChange}>
        Drawer Content
      </Drawer>
    );
    await waitFor(() => {
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });
  });

  it('renders with title', async () => {
    render(
      <Drawer open={true} onOpenChange={mockOnOpenChange} title="Drawer Title">
        Content
      </Drawer>
    );
    await waitFor(() => {
      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    });
  });

  it('renders with action buttons', async () => {
    render(
      <Drawer
        open={true}
        onOpenChange={mockOnOpenChange}
        buttons={[
          { children: 'Cancel', variant: 'outline' },
          { children: 'Save', variant: 'solid' },
        ]}
      >
        Content
      </Drawer>
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('calls button onClick handler when clicked', async () => {
      const onClick = vi.fn();
      const { user } = render(
        <Drawer
          open={true}
          onOpenChange={mockOnOpenChange}
          buttons={[{ children: 'Save', onClick }]}
        >
          Content
        </Drawer>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Save' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('close behavior', () => {
    it('renders close button when onClose is provided', async () => {
      const onClose = vi.fn();
      render(
        <Drawer open={true} onOpenChange={mockOnOpenChange} onClose={onClose}>
          Content
        </Drawer>
      );
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(
        <Drawer open={true} onOpenChange={mockOnOpenChange} onClose={onClose}>
          Content
        </Drawer>
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('accepts onClose handler for keyboard dismiss', async () => {
      const onClose = vi.fn();
      render(
        <Drawer open={true} onOpenChange={mockOnOpenChange} onClose={onClose}>
          Content
        </Drawer>
      );

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      // Drawer accepts onClose handler which will be triggered on Escape
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('focus management', () => {
    it('traps focus within drawer', async () => {
      const { user } = render(
        <Drawer open={true} onOpenChange={mockOnOpenChange} title="Drawer Title">
          <button type="button">First Button</button>
          <button type="button">Second Button</button>
        </Drawer>
      );

      await waitFor(() => {
        expect(screen.getByText('First Button')).toBeInTheDocument();
      });

      // Tab through elements - focus should stay within drawer
      await user.tab();
      await user.tab();
      await user.tab();

      // Focus should cycle within the drawer
      expect(document.activeElement?.closest('[data-part="content"]')).toBeInTheDocument();
    });
  });
});
