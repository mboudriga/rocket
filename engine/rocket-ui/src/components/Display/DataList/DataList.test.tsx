import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { DataList } from './DataList';

const defaultItems = [
  { label: 'Name', value: 'John Doe' },
  { label: 'Email', value: 'john@example.com' },
  { label: 'Phone', value: '+1 234 567 890' },
];

describe('<DataList />', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<DataList items={defaultItems} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders all items', () => {
      render(<DataList items={defaultItems} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('+1 234 567 890')).toBeInTheDocument();
    });

    it('renders labels and values correctly', () => {
      const items = [{ label: 'Status', value: 'Active' }];
      render(<DataList items={items} />);
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders empty list when no items', () => {
      render(<DataList items={[]} />);
      expect(screen.queryByText('Name')).not.toBeInTheDocument();
    });
  });

  describe('value types', () => {
    it('renders string values', () => {
      const items = [{ label: 'Text', value: 'String value' }];
      render(<DataList items={items} />);
      expect(screen.getByText('String value')).toBeInTheDocument();
    });

    it('renders numeric values', () => {
      const items = [{ label: 'Count', value: '42' }];
      render(<DataList items={items} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders ReactNode values', () => {
      const items = [{ label: 'Status', value: <span data-testid="custom-value">Custom</span> }];
      render(<DataList items={items} />);
      expect(screen.getByTestId('custom-value')).toBeInTheDocument();
    });
  });

  describe('orientation', () => {
    it('renders with horizontal orientation', () => {
      render(<DataList items={defaultItems} orientation="horizontal" />);
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('renders with vertical orientation', () => {
      render(<DataList items={defaultItems} orientation="vertical" />);
      expect(screen.getByText('Name')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DataList items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDListElement>();
      render(<DataList ref={ref} items={defaultItems} />);
      expect(ref.current).toBeInstanceOf(HTMLDListElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<DataList className="custom-class" data-testid="test" items={defaultItems} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
