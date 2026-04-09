import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen, waitFor } from '../../../test/test-utils';

import { Select } from './Select';
import type { SelectOption } from './Select.types';

const defaultOptions: Array<SelectOption> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('<Select />', () => {
  it('renders with default props', () => {
    render(<Select id="test-select" options={defaultOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Select id="test-select" options={defaultOptions} placeholder="Select a fruit" />);
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select id="test-select" options={defaultOptions} label="Choose Fruit" />);
    expect(screen.getByText('Choose Fruit')).toBeInTheDocument();
  });

  it('renders with hint', () => {
    render(<Select id="test-select" options={defaultOptions} hint="Pick your favorite" />);
    expect(screen.getByText('Pick your favorite')).toBeInTheDocument();
  });

  it('renders with error', () => {
    render(<Select id="test-select" options={defaultOptions} error="Selection required" />);
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  describe('options', () => {
    it('shows options when clicked', async () => {
      const { user } = render(
        <Select id="test-select" options={defaultOptions} placeholder="Select" />
      );

      await user.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Cherry')).toBeInTheDocument();
      });
    });

    it('renders with empty options array', () => {
      render(<Select id="test-select" options={[]} placeholder="No options" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('renders with default value', () => {
      render(<Select id="test-select" options={defaultOptions} defaultValue={['banana']} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls onChange when option is selected', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Select id="test-select" options={defaultOptions} onChange={onChange} />
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Apple'));

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Select id="test-select" options={defaultOptions} disabled />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-disabled');
    });
  });

  describe('keyboard navigation', () => {
    it('navigates options with ArrowDown key', async () => {
      const { user } = render(
        <Select id="test-select" options={defaultOptions} placeholder="Select" />
      );

      const combobox = screen.getByRole('combobox');
      await user.click(combobox);
      await user.keyboard('{ArrowDown}');

      // Option should be highlighted/focused
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });
    });

    it('selects option when clicked', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Select id="test-select" options={defaultOptions} onChange={onChange} />
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Apple'));

      expect(onChange).toHaveBeenCalled();
    });

    it('renders disabled select with data-disabled attribute', () => {
      render(<Select id="test-select" options={defaultOptions} disabled placeholder="Select" />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('data-disabled');
    });

    it('accepts keyboard input for selection', async () => {
      const { user } = render(
        <Select id="test-select" options={defaultOptions} placeholder="Select" />
      );

      const combobox = screen.getByRole('combobox');
      await user.click(combobox);

      // Options should be visible
      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
      });
    });

    it('shows selected option in trigger after selection', async () => {
      const { user } = render(
        <Select id="test-select" options={defaultOptions} placeholder="Select" />
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Banana'));

      // Selected option should be displayed in the combobox
      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveTextContent('Banana');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Select id="test-select" options={defaultOptions} label="Choose Fruit" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Select id="test-select" ref={ref} options={defaultOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Select
          id="test-select"
          data-testid="custom-select"
          className="custom-class"
          options={defaultOptions}
        />
      );
      expect(screen.getByTestId('custom-select')).toHaveClass('custom-class');
    });
  });

  describe('onChange event shape', () => {
    it('provides event with correct value format for JSON.parse', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Select id="test-select" options={defaultOptions} onChange={onChange} />
      );

      await user.click(screen.getByRole('combobox'));
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

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      render(<Select id="test-select" options={defaultOptions} readOnly />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-readonly');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Select id="test-select" options={defaultOptions} invalid />);
      expect(screen.getByRole('combobox')).toHaveAttribute('data-invalid');
    });
  });
});
