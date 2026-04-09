import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProgressCircle value={50} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with progressbar role', () => {
      render(<ProgressCircle value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with zero value', () => {
      render(<ProgressCircle value={0} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with full value', () => {
      render(<ProgressCircle value={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('value display', () => {
    it('shows children when provided', () => {
      render(<ProgressCircle value={75}>75%</ProgressCircle>);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('shows value text when value is provided', () => {
      render(<ProgressCircle value={50} />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders with size="%s"', (size) => {
      render(<ProgressCircle size={size} value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('color palettes', () => {
    it.each([
      'blue',
      'green',
      'red',
      'yellow',
    ] as const)('renders with colorPalette="%s"', (colorPalette) => {
      render(<ProgressCircle colorPalette={colorPalette} value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('ARIA attributes', () => {
    it('has proper ARIA attributes', () => {
      render(<ProgressCircle value={60} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).toHaveAttribute('aria-valuenow', '60');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ProgressCircle ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<ProgressCircle className="custom-class" data-testid="test" value={50} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
