import { Link } from '@components/Navigation/Link';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';
import { HoverCard } from './HoverCard';

describe('<HoverCard />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <HoverCard trigger={<Link href="#">Hover me</Link>}>Card content</HoverCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders trigger element', () => {
      render(<HoverCard trigger={<Link href="#">Hover me</Link>}>Card content</HoverCard>);
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('respects open prop when true', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} open={true}>
          Card content
        </HoverCard>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with controlled open=false', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} open={false}>
          Card content
        </HoverCard>
      );
      // Component renders with controlled closed state
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('arrow', () => {
    it('renders with hasArrow prop', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} hasArrow open>
          Card content
        </HoverCard>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });
  });

  describe('content', () => {
    it('renders complex content when open', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} open>
          <div>
            <h3>Title</h3>
            <p>Description text</p>
          </div>
        </HoverCard>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  describe('delay props', () => {
    it('accepts openDelay prop', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} openDelay={500}>
          Card content
        </HoverCard>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('accepts closeDelay prop', () => {
      render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} closeDelay={200}>
          Card content
        </HoverCard>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });
  });

  describe('hover interaction', () => {
    it('shows content on hover', async () => {
      const { user } = render(
        <HoverCard trigger={<Link href="#">Hover me</Link>} openDelay={0}>
          Card content
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByText('Card content')).toBeInTheDocument();
      });
    });

    it('calls onOpenChange on hover', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <HoverCard
          trigger={<Link href="#">Hover me</Link>}
          openDelay={0}
          onOpenChange={onOpenChange}
        >
          Card content
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalled();
      });
    });
  });

  describe('callback behavior', () => {
    it('calls onOpenChange with correct shape when opened', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <HoverCard
          trigger={<Link href="#">Hover me</Link>}
          openDelay={0}
          onOpenChange={onOpenChange}
        >
          Card content
        </HoverCard>
      );

      await user.hover(screen.getByText('Hover me'));
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
      });
    });

    it('calls onOpenChange with correct shape when closed', async () => {
      const onOpenChange = vi.fn();
      const { user } = render(
        <HoverCard
          trigger={<Link href="#">Hover me</Link>}
          openDelay={0}
          closeDelay={0}
          onOpenChange={onOpenChange}
        >
          Card content
        </HoverCard>
      );

      const trigger = screen.getByText('Hover me');
      await user.hover(trigger);
      await waitFor(() => {
        expect(screen.getByText('Card content')).toBeInTheDocument();
      });

      onOpenChange.mockClear();
      await user.unhover(trigger);
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: false }));
      });
    });
  });
});
