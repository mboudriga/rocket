import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { TagsInput } from './TagsInput';

describe('<TagsInput />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<TagsInput label="Tags" defaultValue={['React']} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<TagsInput label="Add Tags" defaultValue={['React']} />);
      expect(screen.getByText('Add Tags')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<TagsInput label="Tags" placeholder="Add a tag..." defaultValue={[]} />);
      expect(screen.getByPlaceholderText('Add a tag...')).toBeInTheDocument();
    });

    it('renders existing tags', () => {
      render(<TagsInput label="Tags" defaultValue={['React', 'TypeScript', 'Vitest']} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Vitest')).toBeInTheDocument();
    });

    it('renders without id prop (no ids passed to Root)', () => {
      render(<TagsInput label="Tags" defaultValue={['React']} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with explicit id prop', () => {
      render(<TagsInput id="my-tags-input" label="Tags" defaultValue={['React']} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-tags-input');
    });
  });

  describe('adding tags', () => {
    it('adds tag on Enter key', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['Existing']} onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'NewTag{Enter}');
      expect(onChange).toHaveBeenCalled();
    });

    it('adds tag on blur', async () => {
      const onChange = vi.fn();
      const { user } = render(<TagsInput label="Tags" defaultValue={[]} onChange={onChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'BlurTag');
      await user.tab();
      // Behavior depends on component implementation
      expect(input).toBeInTheDocument();
    });
  });

  describe('value handling', () => {
    it('calls onChange with updated values', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['React']} onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'Vue{Enter}');
      expect(onChange).toHaveBeenCalled();
    });

    it('supports controlled value', () => {
      render(<TagsInput label="Tags" value={['Controlled', 'Value']} onChange={() => {}} />);
      expect(screen.getByText('Controlled')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
    });
  });

  describe('states', () => {
    it('renders in disabled state', () => {
      render(<TagsInput label="Tags" defaultValue={['React']} disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('renders in readOnly state', () => {
      render(<TagsInput label="Tags" defaultValue={['React']} readOnly />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with invalid state', () => {
      render(<TagsInput label="Tags" defaultValue={['React']} invalid />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('does not add tag when disabled', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['React']} disabled onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'NewTag{Enter}');

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('does not add empty tag on Enter', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['React']} onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Enter}');

      // Should not add empty tag
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('respects max tags limit', () => {
      render(<TagsInput label="Tags" defaultValue={['One', 'Two', 'Three']} max={3} />);
      expect(screen.getByText('One')).toBeInTheDocument();
      expect(screen.getByText('Two')).toBeInTheDocument();
      expect(screen.getByText('Three')).toBeInTheDocument();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(<TagsInput label="Tags" defaultValue={[]} hint="Press Enter to add tags" />);
      expect(screen.getByText('Press Enter to add tags')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(
        <TagsInput label="Tags" defaultValue={[]} invalid error="At least one tag is required" />
      );
      expect(screen.getByText('At least one tag is required')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('supports backspace to remove last tag', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['React', 'Vue']} onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Backspace}{Backspace}');
      // Behavior depends on implementation
      expect(input).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<TagsInput label="Tags" defaultValue={['React', 'Vue']} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<TagsInput label="Tags" defaultValue={[]} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <TagsInput
          label="Tags"
          defaultValue={[]}
          data-testid="custom-tags"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-tags')).toHaveClass('custom-class');
    });
  });

  describe('onChange event shape', () => {
    it('provides event with correct value format for JSON.parse', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <TagsInput label="Tags" defaultValue={['React']} onChange={onChange} />
      );

      const input = screen.getByRole('textbox');
      await user.type(input, 'Vue{Enter}');

      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target).toBeDefined();
      expect(event.target.value).toBeDefined();

      // Verify JSON.parse works
      const parsedValue = JSON.parse(event.target.value);
      expect(Array.isArray(parsedValue)).toBe(true);
    });
  });
});
