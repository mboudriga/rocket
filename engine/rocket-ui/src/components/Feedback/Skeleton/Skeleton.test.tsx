import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Skeleton } from './Skeleton';

describe('<Skeleton />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Skeleton />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when loading', async () => {
      const { container } = render(<Skeleton loading>Content</Skeleton>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });
  });

  describe('Skeleton.Circle', () => {
    it('renders circle skeleton', () => {
      render(<Skeleton.Circle size="40px" data-testid="circle-skeleton" />);
      expect(screen.getByTestId('circle-skeleton')).toBeInTheDocument();
    });
  });

  describe('Skeleton.Text', () => {
    it('renders text skeleton', () => {
      const { container } = render(<Skeleton.Text />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders multiple lines', () => {
      const { container } = render(<Skeleton.Text noOfLines={3} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows skeleton when loading', () => {
      render(
        <Skeleton loading data-testid="skeleton">
          Content
        </Skeleton>
      );
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('shows children when not loading', () => {
      render(<Skeleton loading={false}>Loaded Content</Skeleton>);
      expect(screen.getByText('Loaded Content')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Skeleton ref={ref}>Content</Skeleton>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Skeleton className="custom-class" data-testid="test">
          Content
        </Skeleton>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
