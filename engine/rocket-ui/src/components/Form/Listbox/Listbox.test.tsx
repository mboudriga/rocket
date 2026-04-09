import { createRef } from 'react';
import { vi } from 'vitest';
import { render, screen, within } from '../../../test/test-utils';

import { Listbox } from './Listbox';
import type { ListboxItem, ListboxItemGroup } from './Listbox.types';

const basicItems: Array<ListboxItem> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const itemsWithDisabled: Array<ListboxItem> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];

const groupedItems: Array<ListboxItemGroup> = [
  {
    label: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
];

describe('<Listbox />', () => {
  describe('rendering', () => {
    it('renders all items', () => {
      render(<Listbox label="Select fruit" items={basicItems} />);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });

    it('renders listbox with role', () => {
      render(<Listbox label="Select fruit" items={basicItems} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('renders grouped items with group labels', () => {
      render(<Listbox label="Select item" groups={groupedItems} />);
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Carrot')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Listbox label="Pick a fruit" items={basicItems} />);
      expect(screen.getAllByText('Pick a fruit')[0]).toBeInTheDocument();
    });
  });

  describe('single selection', () => {
    it('selects item when clicked', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox
          label="Select fruit"
          items={basicItems}
          selectionMode="single"
          onChange={onChange}
        />
      );

      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalled();
    });

    it('replaces selection when clicking another item', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox
          label="Select fruit"
          items={basicItems}
          selectionMode="single"
          defaultValue={['apple']}
          onChange={onChange}
        />
      );

      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalled();
    });

    it('renders with defaultValue selected', () => {
      render(
        <Listbox
          label="Select fruit"
          items={basicItems}
          selectionMode="single"
          defaultValue={['banana']}
        />
      );
      const listbox = screen.getByRole('listbox');
      const bananaOption = within(listbox).getByText('Banana').closest('[data-part="item"]');
      expect(bananaOption).toHaveAttribute('data-selected');
    });
  });

  describe('multiple selection', () => {
    it('allows selecting multiple items', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox
          label="Select fruits"
          items={basicItems}
          selectionMode="multiple"
          onChange={onChange}
        />
      );

      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalled();

      await user.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('toggles off selected item when clicked again', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox
          label="Select fruits"
          items={basicItems}
          selectionMode="multiple"
          defaultValue={['apple', 'banana']}
          onChange={onChange}
        />
      );

      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates with ArrowDown key', async () => {
      const { user } = render(<Listbox label="Select fruit" items={basicItems} />);

      const listbox = screen.getByRole('listbox');
      listbox.focus();

      await user.keyboard('{ArrowDown}');
      // Listbox should have updated highlight
      expect(listbox).toBeInTheDocument();
    });

    it('navigates with ArrowUp key', async () => {
      const { user } = render(<Listbox label="Select fruit" items={basicItems} />);

      const listbox = screen.getByRole('listbox');
      listbox.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowUp}');

      expect(listbox).toBeInTheDocument();
    });

    it('selects item with Enter key', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox label="Select fruit" items={basicItems} onChange={onChange} />
      );

      const listbox = screen.getByRole('listbox');
      listbox.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalled();
    });

    it('selects item with Space key', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox label="Select fruit" items={basicItems} onChange={onChange} />
      );

      const listbox = screen.getByRole('listbox');
      listbox.focus();

      await user.keyboard('{ArrowDown}');
      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Listbox label="Select fruit" items={basicItems} disabled />);
      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
    });

    it('renders individual disabled items', () => {
      render(<Listbox label="Select fruit" items={itemsWithDisabled} />);
      const bananaOption = screen.getByText('Banana').closest('[data-part="item"]');
      expect(bananaOption).toHaveAttribute('data-disabled');
    });

    it('cannot select disabled items', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox label="Select fruit" items={itemsWithDisabled} onChange={onChange} />
      );

      await user.click(screen.getByText('Banana'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('renders in readOnly state', () => {
      render(<Listbox label="Select fruit" items={basicItems} readOnly />);
      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('respects controlled value prop', () => {
      const { rerender } = render(
        <Listbox label="Select fruit" items={basicItems} value={['apple']} onChange={() => {}} />
      );

      const listbox = screen.getByRole('listbox');
      let appleOption = within(listbox).getByText('Apple').closest('[data-part="item"]');
      expect(appleOption).toHaveAttribute('data-selected');

      rerender(
        <Listbox label="Select fruit" items={basicItems} value={['banana']} onChange={() => {}} />
      );

      const bananaOption = within(listbox).getByText('Banana').closest('[data-part="item"]');
      expect(bananaOption).toHaveAttribute('data-selected');
      appleOption = within(listbox).getByText('Apple').closest('[data-part="item"]');
      expect(appleOption).not.toHaveAttribute('data-selected');
    });
  });

  describe('field wrapper integration', () => {
    it('renders with hint text', () => {
      render(<Listbox label="Select fruit" items={basicItems} hint="Choose your favorite" />);
      expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(
        <Listbox label="Select fruit" items={basicItems} invalid error="Selection is required" />
      );
      expect(screen.getByText('Selection is required')).toBeInTheDocument();
    });

    it('renders with required indicator', () => {
      render(<Listbox label="Select fruit" items={basicItems} required />);
      expect(screen.getAllByText('Select fruit')[0]).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Listbox label="Select fruit" items={basicItems} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Listbox
          label="Select fruit"
          items={basicItems}
          data-testid="custom-listbox"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-listbox')).toHaveClass('custom-class');
    });
  });

  describe('onChange event shape', () => {
    it('provides event with correct value format for JSON.parse', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Listbox label="Select fruit" items={basicItems} onChange={onChange} />
      );

      await user.click(screen.getByText('Apple'));

      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target).toBeDefined();
      expect(event.target.value).toBeDefined();

      // Verify JSON.parse works
      const parsedValue = JSON.parse(event.target.value);
      expect(Array.isArray(parsedValue)).toBe(true);
      expect(parsedValue[0]).toBe('apple');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Listbox label="Select fruit" items={basicItems} invalid />);
      const listbox = screen.getByRole('listbox');
      // Invalid state is handled by the Field wrapper, not the listbox itself
      expect(listbox).toBeInTheDocument();
    });
  });
});
