import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Image } from './Image';

describe('<Image />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with img role', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      expect(screen.getByRole('img', { name: 'Test image' })).toBeInTheDocument();
    });

    it('renders with src', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders with alt text', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test image" />);
      expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });
  });

  describe('sizing', () => {
    it('renders with width and height', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test" width={200} height={150} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders with boxSize', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test" boxSize="100px" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('fit modes', () => {
    it.each([
      'contain',
      'cover',
      'fill',
      'none',
      'scale-down',
    ] as const)('renders with fit="%s"', (fit) => {
      render(<Image src="https://example.com/image.jpg" alt="Test" fit={fit} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('border radius', () => {
    it('renders with rounded corners', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test" borderRadius="md" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders as full circle', () => {
      render(<Image src="https://example.com/image.jpg" alt="Test" borderRadius="full" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLImageElement>();
      render(<Image ref={ref} src="https://example.com/image.jpg" alt="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Image
          className="custom-class"
          data-testid="test"
          src="https://example.com/image.jpg"
          alt="Test"
        />
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
