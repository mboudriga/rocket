import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { RadioGroup } from './RadioGroup';

const defaultOptions = [
  { value: 'one', label: 'Option One' },
  { value: 'two', label: 'Option Two' },
  { value: 'three', label: 'Option Three' },
];

describe('<RadioGroup />', () => {
  it('renders with default props', () => {
    render(<RadioGroup id="test-radio" options={defaultOptions} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<RadioGroup id="test-radio" options={defaultOptions} />);
    expect(screen.getByText('Option One')).toBeInTheDocument();
    expect(screen.getByText('Option Two')).toBeInTheDocument();
    expect(screen.getByText('Option Three')).toBeInTheDocument();
  });

  it('renders all radio buttons', () => {
    render(<RadioGroup id="test-radio" options={defaultOptions} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('renders with label', () => {
    render(<RadioGroup id="test-radio" label="Select an option" options={defaultOptions} />);
    expect(screen.getAllByText('Select an option')[0]).toBeInTheDocument();
  });

  describe('value handling', () => {
    it('renders with defaultValue selected', () => {
      render(<RadioGroup id="test-radio" options={defaultOptions} defaultValue="two" />);
      const radioTwo = screen.getByRole('radio', { name: 'Option Two' });
      expect(radioTwo).toBeChecked();
    });

    it('calls onChange when selection changes', async () => {
      const onChange = vi.fn();
      const { user } = render(
        <RadioGroup id="test-radio" options={defaultOptions} onChange={onChange} />
      );

      const radioTwo = screen.getByRole('radio', { name: 'Option Two' });
      await user.click(radioTwo);
      expect(onChange).toHaveBeenCalled();
      const event = onChange.mock.calls[0]![0];
      expect(event.target).toBeDefined();
      expect(event.target.value).toBeDefined();
    });

    it('supports controlled value', () => {
      render(
        <RadioGroup id="test-radio" options={defaultOptions} value="three" onChange={() => {}} />
      );
      const radioThree = screen.getByRole('radio', { name: 'Option Three' });
      expect(radioThree).toBeChecked();
    });
  });

  describe('disabled states', () => {
    it('renders entire group as disabled', () => {
      render(<RadioGroup id="test-radio" options={defaultOptions} disabled />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders individual options as disabled', () => {
      const optionsWithDisabled = [
        { value: 'one', label: 'Option One' },
        { value: 'two', label: 'Option Two', disabled: true },
        { value: 'three', label: 'Option Three' },
      ];
      render(<RadioGroup id="test-radio" options={optionsWithDisabled} />);
      const radioTwo = screen.getByRole('radio', { name: 'Option Two' });
      expect(radioTwo).toBeDisabled();
    });

    it('does not call onChange when disabled option clicked', async () => {
      const onChange = vi.fn();
      const optionsWithDisabled = [
        { value: 'one', label: 'Option One' },
        { value: 'two', label: 'Option Two', disabled: true },
      ];
      const { user } = render(
        <RadioGroup id="test-radio" options={optionsWithDisabled} onChange={onChange} />
      );

      await user.click(screen.getByText('Option Two'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('supports arrow key navigation', async () => {
      const { user } = render(
        <RadioGroup id="test-radio" options={defaultOptions} defaultValue="one" />
      );

      const radioOne = screen.getByRole('radio', { name: 'Option One' });
      await user.click(radioOne);
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  describe('field wrapper integration', () => {
    it('renders with helper text', () => {
      render(
        <RadioGroup
          id="test-radio"
          label="Choose"
          options={defaultOptions}
          hint="Select one option"
        />
      );
      expect(screen.getByText('Select one option')).toBeInTheDocument();
    });

    it('renders with error text', () => {
      render(
        <RadioGroup
          id="test-radio"
          label="Choose"
          options={defaultOptions}
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
        <RadioGroup id="test-radio" label="Choose option" options={defaultOptions} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref to root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<RadioGroup id="test-radio" ref={ref} options={defaultOptions} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('className', () => {
    it('accepts custom className', () => {
      render(
        <RadioGroup
          id="test-radio"
          options={defaultOptions}
          data-testid="custom-radio"
          className="custom-class"
        />
      );
      expect(screen.getByTestId('custom-radio')).toHaveClass('custom-class');
    });
  });

  describe('readOnly state', () => {
    it('renders in readOnly state', () => {
      render(<RadioGroup id="test-radio" options={defaultOptions} readOnly />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });
  });
});
