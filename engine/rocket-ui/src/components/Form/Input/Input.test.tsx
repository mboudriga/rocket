import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Input } from './Input';

describe('<Input />', () => {
  it('renders with default props', () => {
    render(<Input id="test-input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input id="test-input" label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input id="test-input" placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('renders with hint text', () => {
    render(<Input id="test-input" hint="Please enter a valid email" />);
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('renders with error text', () => {
    render(<Input id="test-input" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  describe('value handling', () => {
    it('renders with initial value', () => {
      render(<Input id="test-input" defaultValue="initial value" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial value');
    });

    it('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      const { user } = render(<Input id="test-input" onChange={onChange} />);

      await user.type(screen.getByRole('textbox'), 'hello');
      expect(onChange).toHaveBeenCalled();
    });

    it('shows typed value in input', async () => {
      const { user } = render(<Input id="test-input" />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'hello world');

      expect(input).toHaveValue('hello world');
    });

    it('does not accept input when disabled', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <Input id="test-input" disabled value="initial" onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'new text');

      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveValue('initial');
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Input id="test-input" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<Input id="test-input" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('renders as required', () => {
      render(<Input id="test-input" required label="Email" />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Input id="test-input" label="Username" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input id="test-input" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(<Input id="test-input" data-testid="custom-input" className="custom-class" />);
      expect(screen.getByTestId('custom-input')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Input id="test-input" invalid />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('variants', () => {
    it('renders with variant="flushed"', () => {
      render(<Input id="test-input" variant="flushed" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with default variant (no variant prop)', () => {
      render(<Input id="test-input" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with variant="outline"', () => {
      render(<Input id="test-input" variant="outline" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
