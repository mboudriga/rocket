import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, fireEvent, render, screen } from '../../../test/test-utils';

import { NumberInput } from './NumberInput';

describe('<NumberInput />', () => {
  it('renders with default props', () => {
    render(<NumberInput id="test-number-input" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<NumberInput id="test-number-input" label="Quantity" />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders with hint', () => {
    render(<NumberInput id="test-number-input" hint="Enter a number" />);
    expect(screen.getByText('Enter a number')).toBeInTheDocument();
  });

  it('renders with error', () => {
    render(<NumberInput id="test-number-input" error="Value is required" />);
    expect(screen.getByText('Value is required')).toBeInTheDocument();
  });

  describe('value handling', () => {
    it('renders with initial value', () => {
      render(<NumberInput id="test-number-input" value="42" />);
      expect(screen.getByRole('spinbutton')).toHaveValue('42');
    });

    it('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      const { user } = render(<NumberInput id="test-number-input" onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');
      expect(onChange).toHaveBeenCalled();
    });

    it('accepts min and max constraints', () => {
      render(<NumberInput id="test-number-input" min={0} max={100} />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('accepts step value', () => {
      render(<NumberInput id="test-number-input" step={5} />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<NumberInput id="test-number-input" disabled />);
      expect(screen.getByRole('spinbutton')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<NumberInput id="test-number-input" readOnly />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('readonly');
    });
  });

  describe('keyboard navigation', () => {
    it('increments value with ArrowUp key', async () => {
      const onChange = vi.fn();
      const { user } = render(<NumberInput id="test-number-input" value="5" onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');

      expect(onChange).toHaveBeenCalled();
    });

    it('decrements value with ArrowDown key', async () => {
      const onChange = vi.fn();
      const { user } = render(<NumberInput id="test-number-input" value="5" onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowDown}');

      expect(onChange).toHaveBeenCalled();
    });

    it('respects min constraint on decrement', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <NumberInput id="test-number-input" value="0" min={0} onChange={onChange} />
      );

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowDown}');

      // Value should not go below min
      expect(input).toHaveValue('0');
    });

    it('respects max constraint on increment', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <NumberInput id="test-number-input" value="10" max={10} onChange={onChange} />
      );

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');

      // Value should not go above max
      expect(input).toHaveValue('10');
    });

    it('does not change value when disabled', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <NumberInput id="test-number-input" value="5" disabled onChange={onChange} />
      );

      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');

      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('5');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<NumberInput id="test-number-input" label="Quantity" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<NumberInput id="test-number-input" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <NumberInput id="test-number-input" data-testid="custom-number" className="custom-class" />
      );
      expect(screen.getByTestId('custom-number')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<NumberInput id="test-number-input" invalid />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('variants', () => {
    it('renders with variant="flushed"', () => {
      render(<NumberInput id="test-number-input" variant="flushed" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('renders with default variant (no variant prop)', () => {
      render(<NumberInput id="test-number-input" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
  });
});
