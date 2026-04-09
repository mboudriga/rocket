import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { PasswordInput } from './PasswordInput';

describe('<PasswordInput />', () => {
  it('renders with default props', () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<PasswordInput label="Password" placeholder="Enter password" />);
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('renders password input type by default', () => {
    render(<PasswordInput label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  describe('visibility toggle', () => {
    it('renders show password button', () => {
      render(<PasswordInput label="Password" />);
      expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
    });

    it('toggles password visibility when button clicked', async () => {
      const { user } = render(<PasswordInput label="Password" />);
      const input = screen.getByLabelText('Password');
      const toggleButton = screen.getByRole('button', { name: /show password/i });

      expect(input).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');

      await user.click(screen.getByRole('button', { name: /hide password/i }));
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('value handling', () => {
    it('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      const { user } = render(<PasswordInput label="Password" onChange={onChange} />);

      await user.type(screen.getByLabelText('Password'), 'secret123');
      expect(onChange).toHaveBeenCalled();
    });

    it('displays the entered value', async () => {
      const { user } = render(<PasswordInput label="Password" />);
      const input = screen.getByLabelText('Password');

      await user.type(input, 'mypassword');
      expect(input).toHaveValue('mypassword');
    });

    it('supports controlled value', () => {
      render(<PasswordInput label="Password" value="controlled" onChange={() => {}} />);
      expect(screen.getByLabelText('Password')).toHaveValue('controlled');
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<PasswordInput label="Password" disabled />);
      expect(screen.getByLabelText('Password')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<PasswordInput label="Password" readOnly />);
      expect(screen.getByLabelText('Password')).toHaveAttribute('readonly');
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(<PasswordInput label="Password" hint="Must be at least 8 characters" />);
      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(<PasswordInput label="Password" invalid error="Password is required" />);
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<PasswordInput label="Password" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<PasswordInput label="Password" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <PasswordInput label="Password" data-testid="custom-password" className="custom-class" />
      );
      expect(screen.getByTestId('custom-password')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<PasswordInput label="Password" invalid />);
      expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
