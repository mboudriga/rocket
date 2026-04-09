import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';
import { Image } from '../Image';
import { AspectRatio } from './AspectRatio';

describe('<AspectRatio />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <AspectRatio>
          <div>Content</div>
        </AspectRatio>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with image', async () => {
      const { container } = render(
        <AspectRatio>
          <Image src="https://example.com/image.jpg" alt="Test" />
        </AspectRatio>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(
        <AspectRatio>
          <div>Child Content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('renders with image child', () => {
      render(
        <AspectRatio>
          <Image src="https://example.com/image.jpg" alt="Test" />
        </AspectRatio>
      );
      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });
  });

  describe('ratio variants', () => {
    it('renders with 16:9 ratio', () => {
      render(
        <AspectRatio ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with 4:3 ratio', () => {
      render(
        <AspectRatio ratio={4 / 3}>
          <div>Content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with 1:1 ratio (square)', () => {
      render(
        <AspectRatio ratio={1}>
          <div>Content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('maxWidth', () => {
    it('renders with maxWidth constraint', () => {
      render(
        <AspectRatio maxWidth="400px">
          <div>Content</div>
        </AspectRatio>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <AspectRatio ref={ref}>
          <div>Content</div>
        </AspectRatio>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <AspectRatio className="custom-class" data-testid="test">
          <div>Content</div>
        </AspectRatio>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
