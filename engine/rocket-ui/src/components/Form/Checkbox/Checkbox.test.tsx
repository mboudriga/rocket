import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Checkbox } from './Checkbox';

describe('<Checkbox />', () => {
  it('renders with default props', () => {
    render(<Checkbox id="test-checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox id="test-checkbox" label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  describe('checked state', () => {
    it('renders as unchecked by default', () => {
      render(<Checkbox id="test-checkbox" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders as checked when defaultChecked is true', () => {
      render(<Checkbox id="test-checkbox" defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders as checked when checked is true', () => {
      render(<Checkbox id="test-checkbox" checked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls onChange when clicked', async () => {
      const onChange = vi.fn();
      const { user } = render(<Checkbox id="test-checkbox" onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target.checked).toBe(true);
    });

    it('toggles checked state on click', async () => {
      const { user } = render(<Checkbox id="test-checkbox" />);

      const checkbox = screen.getByRole('checkbox');

      // Initially unchecked
      expect(checkbox).not.toBeChecked();

      // Click to check
      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      // Click to uncheck
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Checkbox id="test-checkbox" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('does not call onChange when disabled', async () => {
      const onChange = vi.fn();
      const { user } = render(<Checkbox id="test-checkbox" disabled onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('renders as required', () => {
      render(<Checkbox id="test-checkbox" required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });
  });

  describe('keyboard interaction', () => {
    it('is focusable with keyboard', async () => {
      const { user } = render(<Checkbox id="test-checkbox" label="Focus me" />);

      await user.tab();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });

    it('can be toggled with keyboard', async () => {
      const onChange = vi.fn();
      const { user } = render(<Checkbox id="test-checkbox" onChange={onChange} />);

      await user.tab();
      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target.checked).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Checkbox id="test-checkbox" label="Accept terms" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Checkbox id="test-checkbox" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Checkbox id="test-checkbox" data-testid="custom-checkbox" className="custom-class" />
      );
      expect(screen.getByTestId('custom-checkbox')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Checkbox id="test-checkbox" invalid />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      // Check that the checkbox can still be rendered with readOnly prop
      // The component accepts readOnly but doesn't expose it as a data attribute
      render(<Checkbox id="test-checkbox" readOnly />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });
});
