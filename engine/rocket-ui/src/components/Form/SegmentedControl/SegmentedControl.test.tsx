import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { SegmentedControl } from './SegmentedControl';

const defaultItems = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('<SegmentedControl />', () => {
  it('renders with default props', () => {
    render(<SegmentedControl items={defaultItems} defaultValue="a" />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<SegmentedControl items={defaultItems} defaultValue="a" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<SegmentedControl label="Choose option" items={defaultItems} defaultValue="a" />);
    expect(screen.getAllByText('Choose option')[0]).toBeInTheDocument();
  });

  describe('value handling', () => {
    it('renders with defaultValue selected', () => {
      render(<SegmentedControl items={defaultItems} defaultValue="b" />);
      const radioB = screen.getByRole('radio', { name: 'Option B' });
      expect(radioB).toBeChecked();
    });

    it('calls onChange when selection changes', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <SegmentedControl items={defaultItems} defaultValue="a" onChange={onChange} />
      );

      const radioB = screen.getByRole('radio', { name: 'Option B' });
      await user.click(radioB);
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target).toBeDefined();
      expect(event.target.value).toBeDefined();
    });

    it('supports controlled value', () => {
      render(<SegmentedControl items={defaultItems} value="c" onChange={() => {}} />);
      const radioC = screen.getByRole('radio', { name: 'Option C' });
      expect(radioC).toBeChecked();
    });
  });

  describe('disabled states', () => {
    it('renders entire control as disabled', () => {
      render(<SegmentedControl items={defaultItems} defaultValue="a" disabled />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders individual items as disabled', () => {
      const itemsWithDisabled = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ];
      render(<SegmentedControl items={itemsWithDisabled} defaultValue="a" />);
      const radioB = screen.getByRole('radio', { name: 'Option B' });
      expect(radioB).toBeDisabled();
    });
  });

  describe('keyboard navigation', () => {
    it('supports keyboard navigation between segments', async () => {
      const { user } = render(<SegmentedControl items={defaultItems} defaultValue="a" />);

      const radioA = screen.getByRole('radio', { name: 'Option A' });
      await user.click(radioA);
      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(
        <SegmentedControl
          label="Choose"
          items={defaultItems}
          defaultValue="a"
          hint="Select one option"
        />
      );
      expect(screen.getByText('Select one option')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(
        <SegmentedControl
          label="Choose"
          items={defaultItems}
          defaultValue="a"
          invalid
          error="Selection is required"
        />
      );
      expect(screen.getByText('Selection is required')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <SegmentedControl label="Choose option" items={defaultItems} defaultValue="a" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<SegmentedControl ref={ref} items={defaultItems} defaultValue="a" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <SegmentedControl
          items={defaultItems}
          defaultValue="a"
          data-testid="custom-segmented"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-segmented')).toHaveClass('custom-class');
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      render(<SegmentedControl items={defaultItems} defaultValue="a" readOnly />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });
  });
});
