import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Stat } from './Stat';

describe('<Stat />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Stat>42</Stat>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders value content', () => {
      render(<Stat>$1,234.56</Stat>);
      expect(screen.getByText('$1,234.56')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Stat label="Total Sales">$10,000</Stat>);
      expect(screen.getByText('Total Sales')).toBeInTheDocument();
      expect(screen.getByText('$10,000')).toBeInTheDocument();
    });

    it('renders with subLabel', () => {
      render(<Stat subLabel="Last 30 days">500</Stat>);
      expect(screen.getByText('Last 30 days')).toBeInTheDocument();
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('renders with both label and subLabel', () => {
      render(
        <Stat label="Revenue" subLabel="+20% from last month">
          $25,000
        </Stat>
      );
      expect(screen.getByText('Revenue')).toBeInTheDocument();
      expect(screen.getByText('$25,000')).toBeInTheDocument();
      expect(screen.getByText('+20% from last month')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Stat className="custom-stat" data-testid="stat">
          100
        </Stat>
      );
      expect(screen.getByTestId('stat')).toHaveClass('custom-stat');
    });
  });

  describe('different value types', () => {
    it('renders numeric values', () => {
      render(<Stat label="Count">1,234</Stat>);
      expect(screen.getByText('1,234')).toBeInTheDocument();
    });

    it('renders percentage values', () => {
      render(<Stat label="Growth">+15%</Stat>);
      expect(screen.getByText('+15%')).toBeInTheDocument();
    });

    it('renders currency values', () => {
      render(<Stat label="Budget">€50,000</Stat>);
      expect(screen.getByText('€50,000')).toBeInTheDocument();
    });

    it('renders with React node children', () => {
      render(
        <Stat label="Status">
          <span data-testid="custom-content">Active</span>
        </Stat>
      );
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Stat label="Total Sales">$10,000</Stat>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDListElement>();
      render(<Stat ref={ref}>100</Stat>);
      expect(ref.current).toBeInstanceOf(HTMLDListElement);
    });
  });
});
