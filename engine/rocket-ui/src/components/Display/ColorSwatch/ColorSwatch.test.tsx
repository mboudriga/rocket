import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { ColorSwatch } from './ColorSwatch';

describe('<ColorSwatch />', () => {
  it('renders with default props', () => {
    render(<ColorSwatch value="#3182ce" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toBeInTheDocument();
  });

  it('renders with hex color value', () => {
    render(<ColorSwatch value="#ff0000" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toHaveAttribute('data-value', '#ff0000');
  });

  it('renders with rgb color value', () => {
    render(<ColorSwatch value="rgb(255, 0, 0)" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toHaveAttribute('data-value', 'rgb(255, 0, 0)');
  });

  it('renders transparent color', () => {
    render(<ColorSwatch value="transparent" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toHaveAttribute('data-value', 'transparent');
  });

  it('renders with hsl color value', () => {
    render(<ColorSwatch value="hsl(0, 100%, 50%)" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toHaveAttribute('data-value', 'hsl(0, 100%, 50%)');
  });

  it('renders with hsla color value', () => {
    render(<ColorSwatch value="hsla(120, 100%, 50%, 0.5)" data-testid="color-swatch" />);
    expect(screen.getByTestId('color-swatch')).toHaveAttribute(
      'data-value',
      'hsla(120, 100%, 50%, 0.5)'
    );
  });

  describe('size variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)('renders with size="%s"', (size) => {
      render(<ColorSwatch value="#3182ce" size={size} data-testid="color-swatch" />);
      expect(screen.getByTestId('color-swatch')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ColorSwatch value="#3182ce" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<ColorSwatch ref={ref} value="#3182ce" />);
      // Note: ChakraColorSwatch actually renders a span, not a div
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<ColorSwatch className="custom-class" data-testid="test" value="#3182ce" />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
