import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { PinInput } from './PinInput';

describe('<PinInput />', () => {
  describe('rendering', () => {
    it('renders with default props (4 inputs)', () => {
      render(<PinInput id="test-pin-input" />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
    });

    it('renders with custom length', () => {
      render(<PinInput id="test-pin-input" length={6} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('renders with length of 1', () => {
      render(<PinInput id="test-pin-input" length={1} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(1);
    });

    it('renders nothing with length of 0', () => {
      render(<PinInput id="test-pin-input" length={0} />);
      const inputs = screen.queryAllByRole('textbox');
      expect(inputs).toHaveLength(0);
    });

    it('renders nothing with negative length', () => {
      render(<PinInput id="test-pin-input" length={-1} />);
      const inputs = screen.queryAllByRole('textbox');
      expect(inputs).toHaveLength(0);
    });

    it('renders with custom className', () => {
      render(<PinInput id="test-pin-input" className="custom-pin" />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]?.closest('.custom-pin')).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('calls onValueChange when value changes', async () => {
      const onValueChange = vi.fn();
      const { user } = render(<PinInput id="test-pin-input" onValueChange={onValueChange} />);

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0]!, '1');
      expect(onValueChange).toHaveBeenCalled();
    });

    it('renders with default value', () => {
      render(<PinInput id="test-pin-input" defaultValue={['1', '2', '3', '4']} />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveValue('1');
      expect(inputs[1]).toHaveValue('2');
      expect(inputs[2]).toHaveValue('3');
      expect(inputs[3]).toHaveValue('4');
    });

    it('calls onChange with synthetic event containing joined value', async () => {
      const onChange = vi.fn();
      const { user } = render(<PinInput id="test-pin-input" onChange={onChange} />);

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0]!, '1');
      expect(onChange).toHaveBeenCalled();

      const event = onChange.mock.calls[0]![0];
      expect(event.target).toBeDefined();
      expect(event.target.value).toBeDefined();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<PinInput id="test-pin-input" disabled />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });
  });

  describe('input type', () => {
    it('renders with alphanumeric type by default', () => {
      render(<PinInput id="test-pin-input" />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toBeInTheDocument();
    });

    it('renders with numeric type', () => {
      render(<PinInput id="test-pin-input" type="numeric" />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveAttribute('inputmode', 'numeric');
    });
  });

  describe('placeholder', () => {
    it('renders with placeholder', () => {
      render(<PinInput id="test-pin-input" placeholder="○" />);
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0]).toHaveAttribute('placeholder', '○');
    });
  });

  describe('focus behavior', () => {
    it('moves focus to next input after typing', async () => {
      const { user } = render(<PinInput id="test-pin-input" />);

      const inputs = screen.getAllByRole('textbox');
      await user.click(inputs[0]!);
      await user.type(inputs[0]!, '1');

      // Focus should have moved to next input
      expect(inputs[1]).toHaveFocus();
    });

    it('moves focus to previous on Backspace when empty', async () => {
      const { user } = render(<PinInput id="test-pin-input" />);

      const inputs = screen.getAllByRole('textbox');
      // Type in first input
      await user.click(inputs[0]!);
      await user.type(inputs[0]!, '1');
      // Now we should be on second input
      await user.keyboard('{Backspace}');

      // Should clear current and focus should stay or move back
      expect(inputs[0]).toHaveFocus();
    });

    it('calls onValueComplete when all inputs filled', async () => {
      const onValueComplete = vi.fn();
      const { user } = render(
        <PinInput id="test-pin-input" length={4} onValueComplete={onValueComplete} />
      );

      const inputs = screen.getAllByRole('textbox');
      await user.click(inputs[0]!);
      await user.type(inputs[0]!, '1234');

      expect(onValueComplete).toHaveBeenCalled();
    });

    it('does not accept input when disabled', async () => {
      const onValueChange = vi.fn();
      const { user } = render(
        <PinInput id="test-pin-input" disabled onValueChange={onValueChange} />
      );

      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0]!, '1');

      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<PinInput id="test-pin-input" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<PinInput id="test-pin-input" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      render(<PinInput id="test-pin-input" readOnly />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('readonly');
      });
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<PinInput id="test-pin-input" invalid />);
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('data-invalid');
      });
    });
  });
});
