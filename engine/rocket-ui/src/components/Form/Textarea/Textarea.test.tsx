import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Textarea } from './Textarea';

describe('<Textarea />', () => {
  it('renders with default props', () => {
    render(<Textarea id="test-textarea" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea id="test-textarea" label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea id="test-textarea" placeholder="Enter your message" />);
    expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
  });

  it('renders with hint text', () => {
    render(<Textarea id="test-textarea" hint="Maximum 500 characters" />);
    expect(screen.getByText('Maximum 500 characters')).toBeInTheDocument();
  });

  it('renders with error text', () => {
    render(<Textarea id="test-textarea" error="Description is required" />);
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });

  describe('value handling', () => {
    it('renders with initial value', () => {
      render(<Textarea id="test-textarea" defaultValue="initial content" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial content');
    });

    it('calls onChange when value changes', async () => {
      const onChange = vi.fn();
      const { user } = render(<Textarea id="test-textarea" onChange={onChange} />);

      await user.type(screen.getByRole('textbox'), 'test');
      expect(onChange).toHaveBeenCalled();
    });

    it('supports multiline text', async () => {
      const { user } = render(<Textarea id="test-textarea" />);

      await user.type(screen.getByRole('textbox'), 'line1{enter}line2');
      expect(screen.getByRole('textbox')).toHaveValue('line1\nline2');
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<Textarea id="test-textarea" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<Textarea id="test-textarea" readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('renders as required', () => {
      render(<Textarea id="test-textarea" required label="Comment" />);
      expect(screen.getByRole('textbox')).toBeRequired();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Textarea id="test-textarea" label="Comment" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to textarea element', () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea id="test-textarea" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <Textarea id="test-textarea" data-testid="custom-textarea" className="custom-class" />
      );
      expect(screen.getByTestId('custom-textarea')).toHaveClass('custom-class');
    });
  });

  describe('invalid state', () => {
    it('applies invalid styling', () => {
      render(<Textarea id="test-textarea" invalid />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('variants', () => {
    it('renders with variant="flushed"', () => {
      render(<Textarea id="test-textarea" variant="flushed" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with default variant (no variant prop)', () => {
      render(<Textarea id="test-textarea" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
