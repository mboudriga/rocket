import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Switch } from './Switch';

describe('<Switch />', () => {
  it('renders with default props', () => {
    render(<Switch id="test-switch" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  describe('checked state', () => {
    it('renders as unchecked by default', () => {
      render(<Switch id="test-switch" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders as checked when checked is true', () => {
      render(<Switch id="test-switch" checked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('calls onChange when clicked', async () => {
      const onChange = vi.fn();
      const { user } = render(<Switch id="test-switch" onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target.checked).toBe(true);
    });

    it('toggles checked state on click', async () => {
      const { user } = render(<Switch id="test-switch" />);

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
      render(<Switch id="test-switch" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('does not call onChange when disabled', async () => {
      const onChange = vi.fn();
      const { user } = render(<Switch id="test-switch" disabled onChange={onChange} />);

      await user.click(screen.getByRole('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('renders as required', () => {
      render(<Switch id="test-switch" required />);
      expect(screen.getByRole('checkbox')).toBeRequired();
    });
  });

  describe('keyboard interaction', () => {
    it('is focusable with keyboard', async () => {
      const { user } = render(<Switch id="test-switch" aria-label="Toggle" />);

      await user.tab();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });

    it('can be toggled with keyboard', async () => {
      const onChange = vi.fn();
      const { user } = render(<Switch id="test-switch" onChange={onChange} />);

      await user.tab();
      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target.checked).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Switch id="test-switch" aria-label="Toggle feature" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Switch id="test-switch" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(<Switch id="test-switch" data-testid="custom-switch" className="custom-class" />);
      expect(screen.getByTestId('custom-switch')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Switch id="test-switch" invalid />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      // Check that the switch can still be rendered with readOnly prop
      // The component accepts readOnly but doesn't expose it as a data attribute
      render(<Switch id="test-switch" readOnly />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });
  });
});
