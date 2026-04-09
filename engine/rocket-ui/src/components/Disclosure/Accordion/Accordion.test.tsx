import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Accordion } from './Accordion';
import type { AccordionItemProps } from './Accordion.types';

const defaultItems: Array<AccordionItemProps> = [
  { value: 'item-1', title: 'First Item', content: 'First content' },
  { value: 'item-2', title: 'Second Item', content: 'Second content' },
  { value: 'item-3', title: 'Third Item', content: 'Third content' },
];

describe('<Accordion />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Accordion items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders all accordion items', () => {
    render(<Accordion items={defaultItems} />);
    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
    expect(screen.getByText('Third Item')).toBeInTheDocument();
  });

  it('renders with empty items array', () => {
    const { container } = render(<Accordion items={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with undefined items prop', () => {
    const { container } = render(
      <Accordion items={undefined as unknown as Array<AccordionItemProps>} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  describe('variants', () => {
    it('renders with variant="plain"', () => {
      render(<Accordion items={defaultItems} variant="plain" />);
      expect(screen.getByText('First Item')).toBeInTheDocument();
    });

    it('renders with variant="enclosed"', () => {
      render(<Accordion items={defaultItems} variant="enclosed" />);
      expect(screen.getByText('First Item')).toBeInTheDocument();
    });

    it('renders with variant="outline" (applies no background)', () => {
      render(<Accordion items={defaultItems} variant="outline" />);
      expect(screen.getByText('First Item')).toBeInTheDocument();
    });
  });

  describe('expand/collapse behavior', () => {
    it('expands item when clicked', async () => {
      const { user } = render(<Accordion items={defaultItems} />);

      await user.click(screen.getByText('First Item'));
      await waitFor(() => {
        expect(screen.getByText('First content')).toBeInTheDocument();
      });
    });

    it('renders with defaultValue to expand specific item', async () => {
      render(<Accordion items={defaultItems} defaultValue={['item-2']} />);
      await waitFor(() => {
        expect(screen.getByText('Second content')).toBeInTheDocument();
      });
    });
  });

  describe('multiple mode', () => {
    it('allows multiple items expanded when multiple is true', async () => {
      const { user } = render(<Accordion items={defaultItems} multiple />);

      await user.click(screen.getByText('First Item'));
      await user.click(screen.getByText('Second Item'));

      await waitFor(() => {
        expect(screen.getByText('First content')).toBeInTheDocument();
        expect(screen.getByText('Second content')).toBeInTheDocument();
      });
    });
  });

  describe('callbacks', () => {
    it('calls onValueChange when item is expanded', async () => {
      const onValueChange = vi.fn();
      const { user } = render(<Accordion items={defaultItems} onValueChange={onValueChange} />);

      await user.click(screen.getByText('First Item'));
      expect(onValueChange).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates items with ArrowDown/ArrowUp', async () => {
      const { user } = render(<Accordion items={defaultItems} />);

      const firstTrigger = screen.getByRole('button', { name: /first item/i });
      firstTrigger.focus();

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('button', { name: /second item/i })).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(firstTrigger).toHaveFocus();
    });

    it('expands item with Enter key', async () => {
      const { user } = render(<Accordion items={defaultItems} />);

      const firstTrigger = screen.getByRole('button', { name: /first item/i });
      firstTrigger.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByText('First content')).toBeInTheDocument();
      });
    });

    it('expands item with Space key', async () => {
      const { user } = render(<Accordion items={defaultItems} />);

      const firstTrigger = screen.getByRole('button', { name: /first item/i });
      firstTrigger.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(screen.getByText('First content')).toBeInTheDocument();
      });
    });

    it('verifies collapsed content is hidden', async () => {
      const { user } = render(<Accordion items={defaultItems} collapsible />);

      // Expand first item
      await user.click(screen.getByText('First Item'));
      await waitFor(() => {
        expect(screen.getByText('First content')).toBeInTheDocument();
      });

      // Collapse it
      await user.click(screen.getByText('First Item'));
      await waitFor(() => {
        expect(screen.queryByText('First content')).not.toBeVisible();
      });
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      const items = [{ value: 'item-1', title: 'Item 1', content: 'Content 1' }];
      render(<Accordion ref={ref} items={items} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      const items = [{ value: 'item-1', title: 'Item 1', content: 'Content 1' }];
      render(<Accordion className="custom-class" data-testid="test" items={items} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
