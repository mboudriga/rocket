import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Divider } from './Divider';

describe('<Divider />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Divider />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with separator role', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('accepts custom className', () => {
      render(<Divider className="custom-class" data-testid="divider" />);
      expect(screen.getByTestId('divider')).toHaveClass('custom-class');
    });
  });

  describe('orientation', () => {
    it('renders horizontal divider by default', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical divider', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('styling', () => {
    it('renders with custom borderColor', () => {
      render(<Divider borderColor="gray.300" />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders with custom size', () => {
      render(<Divider size="md" />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders with semantic color token', () => {
      render(<Divider borderColor="fg.muted" />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it.each(['xs', 'sm', 'md', 'lg'] as const)('renders with size="%s"', (size) => {
      render(<Divider size={size} />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it.each(['solid', 'dashed', 'dotted'] as const)('renders with variant="%s"', (variant) => {
      render(<Divider variant={variant} />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});
