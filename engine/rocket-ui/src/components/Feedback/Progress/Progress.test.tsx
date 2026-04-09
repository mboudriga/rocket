import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Progress } from './Progress';

describe('<Progress />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Progress value={50} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with progressbar role', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders with zero value', () => {
      render(<Progress value={0} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with full value', () => {
      render(<Progress value={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('value handling', () => {
    it('accepts value between min and max', () => {
      render(<Progress value={75} min={0} max={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    });

    it('accepts custom min and max values', () => {
      render(<Progress value={50} min={0} max={200} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
    });
  });

  describe('size variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders with size="%s"', (size) => {
      render(<Progress size={size} value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('visual variants', () => {
    it.each(['outline', 'subtle'] as const)('renders with variant="%s"', (variant) => {
      render(<Progress variant={variant} value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('shape variants', () => {
    it.each(['square', 'rounded', 'full'] as const)('renders with shape="%s"', (shape) => {
      render(<Progress shape={shape} value={50} />);
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
      render(<Progress colorPalette={colorPalette} value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('ARIA attributes', () => {
    it('has proper ARIA attributes', () => {
      render(<Progress value={75} min={0} max={100} />);
      const progressbar = screen.getByRole('progressbar');

      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<Progress className="custom-class" data-testid="test" value={50} />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
