import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Circle } from './Circle';

describe('<Circle />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Circle>A</Circle>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children content', () => {
      render(<Circle>Text</Circle>);
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Circle ref={ref}>A</Circle>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Circle className="custom-class" data-testid="circle">
          C
        </Circle>
      );
      expect(screen.getByTestId('circle')).toHaveClass('custom-class');
    });

    it('renders with icon', () => {
      render(
        <Circle>
          <span data-testid="icon">I</span>
        </Circle>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('renders with numeric size', () => {
      render(<Circle size={40}>A</Circle>);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('renders with string size', () => {
      render(<Circle size="60px">B</Circle>);
      expect(screen.getByText('B')).toBeInTheDocument();
    });

    it('renders with token size', () => {
      render(<Circle size="10">C</Circle>);
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies background color', () => {
      render(<Circle bg="blue.500">D</Circle>);
      expect(screen.getByText('D')).toBeInTheDocument();
    });

    it('applies semantic color tokens', () => {
      render(
        <Circle bg="bg.muted" color="fg">
          E
        </Circle>
      );
      expect(screen.getByText('E')).toBeInTheDocument();
    });

    it('applies border properties', () => {
      render(
        <Circle borderWidth="2px" borderColor="border">
          F
        </Circle>
      );
      expect(screen.getByText('F')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty children', () => {
      render(<Circle data-testid="empty-circle" />);
      expect(screen.getByTestId('empty-circle')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Circle>{null}</Circle>);
      expect(screen.queryByText('Text')).not.toBeInTheDocument();
    });

    it('handles long text content', () => {
      render(<Circle>Very Long Text Content</Circle>);
      expect(screen.getByText('Very Long Text Content')).toBeInTheDocument();
    });
  });
});
