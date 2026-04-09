import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Center } from './Center';

describe('<Center />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Center>Centered Content</Center>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Center>Centered Content</Center>);
      expect(screen.getByText('Centered Content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Center ref={ref}>Content</Center>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Center className="custom-class" data-testid="center">
          Content
        </Center>
      );
      expect(screen.getByTestId('center')).toHaveClass('custom-class');
    });
  });

  describe('sizing', () => {
    it('renders with width and height', () => {
      render(
        <Center width="200px" height="200px">
          Content
        </Center>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with boxSize', () => {
      render(<Center boxSize="100px">Content</Center>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('nested content', () => {
    it('centers nested elements', () => {
      render(
        <Center>
          <div>Inner Content</div>
        </Center>
      );
      expect(screen.getByText('Inner Content')).toBeInTheDocument();
    });
  });

  describe('axis prop', () => {
    it('renders with both axis centering (default)', () => {
      render(<Center axis="both">Both axes</Center>);
      expect(screen.getByText('Both axes')).toBeInTheDocument();
    });

    it('renders with horizontal axis centering', () => {
      render(<Center axis="horizontal">Horizontal only</Center>);
      expect(screen.getByText('Horizontal only')).toBeInTheDocument();
    });

    it('renders with vertical axis centering', () => {
      render(<Center axis="vertical">Vertical only</Center>);
      expect(screen.getByText('Vertical only')).toBeInTheDocument();
    });
  });

  describe('responsive sizing', () => {
    it('renders with responsive width', () => {
      render(
        <Center width={{ base: '100%', tablet: '50%', desktop: '300px' }}>Responsive width</Center>
      );
      expect(screen.getByText('Responsive width')).toBeInTheDocument();
    });

    it('renders with responsive height', () => {
      render(
        <Center height={{ base: '100px', tablet: '200px', desktop: '300px' }}>
          Responsive height
        </Center>
      );
      expect(screen.getByText('Responsive height')).toBeInTheDocument();
    });

    it('renders with responsive boxSize', () => {
      render(
        <Center boxSize={{ base: '50px', tablet: '100px', desktop: '150px' }}>
          Responsive box
        </Center>
      );
      expect(screen.getByText('Responsive box')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles null children gracefully', () => {
      render(<Center>{null}</Center>);
      const center = screen.queryByText('Content');
      expect(center).not.toBeInTheDocument();
    });

    it('handles undefined children gracefully', () => {
      render(<Center>{undefined}</Center>);
      const center = screen.queryByText('Content');
      expect(center).not.toBeInTheDocument();
    });

    it('handles empty children gracefully', () => {
      render(<Center />);
      const center = screen.queryByText('Content');
      expect(center).not.toBeInTheDocument();
    });
  });
});
