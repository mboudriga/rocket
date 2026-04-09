import { createRef } from 'react';
import { LuCheck, LuCircle } from 'react-icons/lu';
import { axe, render, screen } from '../../../test/test-utils';

import { Timeline } from './Timeline';

const defaultItems = [
  { title: 'Step 1', description: 'First step description' },
  { title: 'Step 2', description: 'Second step description' },
  { title: 'Step 3', description: 'Third step description' },
];

describe('<Timeline />', () => {
  it('renders with default props', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders all items with titles and descriptions', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('First step description')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Second step description')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Third step description')).toBeInTheDocument();
  });

  it('renders items with title only', () => {
    const items = [{ title: 'Title Only 1' }, { title: 'Title Only 2' }];
    render(<Timeline items={items} />);
    expect(screen.getByText('Title Only 1')).toBeInTheDocument();
    expect(screen.getByText('Title Only 2')).toBeInTheDocument();
  });

  it('renders items with custom icons', () => {
    const items = [
      { title: 'Completed', icon: <LuCheck data-testid="check-icon" /> },
      { title: 'Pending', icon: <LuCircle data-testid="circle-icon" /> },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    expect(screen.getByTestId('circle-icon')).toBeInTheDocument();
  });

  it('renders empty timeline when no items', () => {
    render(<Timeline items={[]} />);
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Timeline items={defaultItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('variant prop', () => {
    it('renders with solid variant', () => {
      render(<Timeline items={defaultItems} variant="solid" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
      render(<Timeline items={defaultItems} variant="outline" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders with subtle variant', () => {
      render(<Timeline items={defaultItems} variant="subtle" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders with plain variant', () => {
      render(<Timeline items={defaultItems} variant="plain" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
  });

  describe('size prop', () => {
    it('renders with small size', () => {
      render(<Timeline items={defaultItems} size="sm" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders with medium size (default)', () => {
      render(<Timeline items={defaultItems} size="md" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('renders with large size', () => {
      render(<Timeline items={defaultItems} size="lg" />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles undefined items prop gracefully', () => {
      render(<Timeline items={undefined} />);
      expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
    });

    it('handles items with missing description', () => {
      const items = [{ title: 'Title Only 1' }, { title: 'Title Only 2', description: '' }];
      render(<Timeline items={items} />);
      expect(screen.getByText('Title Only 1')).toBeInTheDocument();
      expect(screen.getByText('Title Only 2')).toBeInTheDocument();
    });

    it('handles items with missing title', () => {
      const items = [{ description: 'Description only' }];
      render(<Timeline items={items} />);
      expect(screen.getByText('Description only')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      const items = [{ title: 'Step 1', description: 'First step' }];
      render(<Timeline ref={ref} items={items} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      const items = [{ title: 'Step 1', description: 'First step' }];
      render(<Timeline className="custom-class" data-testid="test" items={items} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
