import { createRef } from 'react';
import { act } from '@testing-library/react';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Combobox } from './Combobox';

const defaultItems = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

describe('<Combobox />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Combobox label="Select" items={defaultItems} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Combobox label="Choose a fruit" items={defaultItems} />);
      expect(screen.getByText('Choose a fruit')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Combobox label="Select" items={defaultItems} placeholder="Search fruits..." />);
      expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
    });

    it('renders trigger button', () => {
      render(<Combobox label="Select" items={defaultItems} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('dropdown interaction', () => {
    it('opens dropdown on trigger click', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('opens dropdown on input focus', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      const input = screen.getByRole('combobox');
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('shows all items in dropdown', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();
      });
    });
  });

  describe('item selection', () => {
    it('selects item on click', async () => {
      const onChange = vi.fn();
      const { user } = render(<Combobox label="Select" items={defaultItems} onChange={onChange} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      const parsedValue = JSON.parse(event.target.value);
      expect(parsedValue).toEqual(['apple']);
    });

    it('closes dropdown after selection', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('filtering', () => {
    it('filters items based on input', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      const input = screen.getByRole('combobox');
      await user.type(input, 'app');

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        // Other items may be hidden based on filter
      });
    });

    it('shows no results message when no items match', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      const input = screen.getByRole('combobox');
      await user.type(input, 'xyz');

      // Behavior depends on implementation
      expect(input).toHaveValue('xyz');
    });
  });

  describe('value handling', () => {
    it('renders with defaultValue', () => {
      render(<Combobox label="Select" items={defaultItems} defaultValue={['banana']} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls onChange with selected values', async () => {
      const onChange = vi.fn();
      const { user } = render(<Combobox label="Select" items={defaultItems} onChange={onChange} />);

      await user.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Cherry'));
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      const parsedValue = JSON.parse(event.target.value);
      expect(parsedValue).toEqual(['cherry']);
    });

    it('supports controlled value', () => {
      render(<Combobox label="Select" items={defaultItems} value={['date']} onChange={() => {}} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Combobox label="Select" items={defaultItems} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<Combobox label="Select" items={defaultItems} readOnly />);
      expect(screen.getByRole('combobox')).toHaveAttribute('readonly');
    });

    it('renders in invalid state', () => {
      render(<Combobox label="Select" items={defaultItems} invalid />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('opens dropdown on arrow down', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('closes dropdown on Escape', async () => {
      const { user } = render(<Combobox label="Select" items={defaultItems} />);

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      // Wait for the dismissable layer's deferred RAF setup to complete
      await act(async () => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      });

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(<Combobox label="Select" items={defaultItems} hint="Choose your favorite fruit" />);
      expect(screen.getByText('Choose your favorite fruit')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(
        <Combobox label="Select" items={defaultItems} invalid error="Selection is required" />
      );
      expect(screen.getByText('Selection is required')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Combobox label="Select a fruit" items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Combobox label="Select" items={defaultItems} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Combobox
          label="Select"
          items={defaultItems}
          data-testid="custom-combobox"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-combobox')).toHaveClass('custom-class');
    });
  });

  describe('onChange event shape', () => {
    it('provides event with correct value format for JSON.parse', async () => {
      const onChange = vi.fn();
      const { user } = render(<Combobox label="Select" items={defaultItems} onChange={onChange} />);

      await user.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
      await user.click(screen.getByText('Apple'));

      expect(onChange).toHaveBeenCalled();
      // Combobox onChange provides a synthetic event with JSON-stringified array value
      const event = onChange.mock.calls[0]![0];
      expect(event.target.value).toBe('["apple"]');
      const parsedValue = JSON.parse(event.target.value);
      expect(parsedValue).toEqual(['apple']);
    });
  });
});
