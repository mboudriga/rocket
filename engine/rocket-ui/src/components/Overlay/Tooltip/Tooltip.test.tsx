import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { Button } from '../../Form/Button';
import { Tooltip } from './Tooltip';

describe('<Tooltip />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Tooltip trigger={<Button>Hover me</Button>}>Tooltip content</Tooltip>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders trigger element', () => {
      render(<Tooltip trigger={<Button>Hover me</Button>}>Tooltip content</Tooltip>);
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('renders with defaultOpen', async () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} defaultOpen={true}>
          Tooltip content
        </Tooltip>
      );
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });
  });

  describe('hover behavior', () => {
    it('shows tooltip on hover', async () => {
      const { user } = render(
        <Tooltip trigger={<Button>Hover me</Button>} openDelay={0}>
          Tooltip content
        </Tooltip>
      );

      await user.hover(screen.getByRole('button', { name: 'Hover me' }));
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });
  });

  describe('arrow', () => {
    it('renders with arrow when hasArrow is true', async () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} hasArrow={true} defaultOpen={true}>
          Tooltip content
        </Tooltip>
      );
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });

    it('renders without arrow when hasArrow is false', async () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} hasArrow={false} defaultOpen={true}>
          Tooltip content
        </Tooltip>
      );
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} disabled>
          Tooltip content
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });
  });

  describe('configuration', () => {
    it('renders with custom openDelay', () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} openDelay={1000}>
          Tooltip content
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('renders with custom closeDelay', () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} closeDelay={500}>
          Tooltip content
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('renders with interactive mode', async () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} interactive={true} defaultOpen={true}>
          Tooltip content
        </Tooltip>
      );
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard accessibility', () => {
    it('trigger is focusable', () => {
      render(
        <Tooltip trigger={<Button>Hover me</Button>} openDelay={0}>
          Tooltip content
        </Tooltip>
      );

      const trigger = screen.getByRole('button', { name: 'Hover me' });
      expect(trigger).not.toHaveAttribute('tabindex', '-1');
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange when tooltip opens', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Tooltip trigger={<Button>Hover me</Button>} openDelay={0} onOpenChange={onOpenChange}>
          Tooltip content
        </Tooltip>
      );

      await user.hover(screen.getByRole('button', { name: 'Hover me' }));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
      });
    });

    it('calls onOpenChange when tooltip closes', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <Tooltip
          trigger={<Button>Hover me</Button>}
          openDelay={0}
          closeDelay={0}
          onOpenChange={onOpenChange}
        >
          Tooltip content
        </Tooltip>
      );

      const trigger = screen.getByRole('button', { name: 'Hover me' });
      await user.hover(trigger);
      await waitFor(() => {
        expect(screen.getByText('Tooltip content')).toBeInTheDocument();
      });

      onOpenChange.mockClear();
      await user.unhover(trigger);
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false }));
      });
    });
  });
});
