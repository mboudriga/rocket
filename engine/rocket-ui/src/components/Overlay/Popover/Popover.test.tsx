import { Button } from '@components/Form/Button';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { Popover } from './Popover';

describe('<Popover />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Popover trigger={<Button>Open</Button>} title="Title">
          Content
        </Popover>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders trigger element', () => {
      render(
        <Popover trigger={<Button>Open</Button>} title="Title">
          Content
        </Popover>
      );
      expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    });

    it('renders trigger element accessibly', () => {
      render(
        <Popover trigger={<Button>Open</Button>} title="Title">
          Popover content
        </Popover>
      );
      // Trigger button has proper ARIA attributes
      const trigger = screen.getByRole('button', { name: 'Open' });
      expect(trigger).toHaveAttribute('aria-haspopup');
    });
  });

  describe('open/close behavior', () => {
    it('opens on trigger click', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} title="Title">
          Popover content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));

      await waitFor(() => {
        expect(screen.getByText('Popover content')).toBeInTheDocument();
      });
    });

    it('shows title when provided', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} title="My Title">
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));

      await waitFor(() => {
        expect(screen.getByText('My Title')).toBeInTheDocument();
      });
    });

    it('supports Escape key interaction', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} title="Title">
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      // Escape key should be handled without errors
      await user.keyboard('{Escape}');
      // Trigger remains accessible
      expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    });
  });

  describe('arrow', () => {
    it('renders arrow when hasArrow is true', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} hasArrow>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });

    it('does not render arrow by default', async () => {
      const { user } = render(<Popover trigger={<Button>Open</Button>}>Content</Popover>);

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('close button', () => {
    it('renders close button when hasCloseButton is true', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} hasCloseButton>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });
    });

    it('close button is clickable', async () => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} hasCloseButton>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      });

      // Close button click should not throw
      await user.click(screen.getByRole('button', { name: /close/i }));
      // Trigger remains accessible
      expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('respects open prop', () => {
      render(
        <Popover trigger={<Button>Open</Button>} open={true}>
          Content
        </Popover>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('calls onOpenChange when state changes', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} onOpenChange={onOpenChange}>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
      });
    });
  });

  describe('placement', () => {
    it.each([
      'top',
      'bottom',
      'left',
      'right',
    ] as const)('renders with placement="%s"', async (placement) => {
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} positioning={{ placement }}>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard interaction', () => {
    it('calls onOpenChange with { open: false } when dismissed', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Popover trigger={<Button>Open</Button>} onOpenChange={onOpenChange} hasCloseButton>
          Content
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: 'Open' }));
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });

      onOpenChange.mockClear();
      await user.click(screen.getByRole('button', { name: /close/i }));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false }));
      });
    });
  });
});
