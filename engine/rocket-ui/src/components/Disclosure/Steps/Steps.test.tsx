import { createRef } from 'react';
import { vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';

import { Steps } from './Steps';

const defaultItems = [
  { title: 'Step 1', description: 'First step description' },
  { title: 'Step 2', description: 'Second step description' },
  { title: 'Step 3', description: 'Third step description' },
];

describe('<Steps />', () => {
  describe('rendering', () => {
    it('renders all steps', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('renders step descriptions', () => {
      render(<Steps items={defaultItems} />);
      expect(screen.getByText('First step description')).toBeInTheDocument();
      expect(screen.getByText('Second step description')).toBeInTheDocument();
    });

    it('renders steps without descriptions', () => {
      const items = [{ title: 'Step A' }, { title: 'Step B' }];
      render(<Steps items={items} />);
      expect(screen.getByText('Step A')).toBeInTheDocument();
      expect(screen.getByText('Step B')).toBeInTheDocument();
    });

    it('renders with undefined items prop', () => {
      const { container } = render(
        <Steps items={undefined as unknown as Array<{ title: string }>} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders steps with icons', () => {
      const items = [
        { title: 'Step 1', icon: <span data-testid="step-icon">1</span> },
        { title: 'Step 2' },
      ];
      render(<Steps items={items} />);
      expect(screen.getByTestId('step-icon')).toBeInTheDocument();
    });
  });

  describe('current step', () => {
    it('marks the current step with data-current attribute', () => {
      render(<Steps items={defaultItems} defaultStep={1} />);

      // Step 2 should be current (index 1)
      const step2Title = screen.getByText('Step 2');
      const step2Trigger = step2Title.closest('[data-current]');
      expect(step2Trigger).toBeInTheDocument();

      // Step 1 should not be current
      const step1Title = screen.getByText('Step 1');
      const step1Trigger = step1Title.closest('button');
      expect(step1Trigger).not.toHaveAttribute('data-current');
    });
  });

  describe('step interaction', () => {
    it('calls onChange and updates UI when step changes', async () => {
      const onChange = vi.fn();
      const { user } = render(<Steps items={defaultItems} onChange={onChange} />);

      // Initially Step 1 should be current
      const step1Title = screen.getByText('Step 1');
      const step1Trigger = step1Title.closest('[data-current]');
      expect(step1Trigger).toBeInTheDocument();

      // Click on Step 2
      await user.click(screen.getByText('Step 2'));
      expect(onChange).toHaveBeenCalled();

      // Verify UI reflects new step - Step 2 should now be current
      const step2Title = screen.getByText('Step 2');
      const step2Trigger = step2Title.closest('[data-current]');
      expect(step2Trigger).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      const items = [{ title: 'Step 1', description: 'First step' }];
      render(<Steps ref={ref} items={items} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      const items = [{ title: 'Step 1', description: 'First step' }];
      render(<Steps className="custom-class" data-testid="test" items={items} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
