import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Float } from './Float';

describe('<Float />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Float>Content</Float>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children content', () => {
      render(
        <Float>
          <span data-testid="child">Child element</span>
        </Float>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Float ref={ref}>Content</Float>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('accepts custom className', () => {
      render(
        <Float className="custom-class" data-testid="float">
          Content
        </Float>
      );
      expect(screen.getByTestId('float')).toHaveClass('custom-class');
    });
  });

  describe('placement', () => {
    it.each([
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'top-center',
      'bottom-center',
    ] as const)('renders with placement="%s"', (placement) => {
      render(<Float placement={placement}>Content</Float>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it.each([
      'middle-start',
      'middle-center',
      'middle-end',
    ] as const)('renders with middle placement="%s"', (placement) => {
      render(<Float placement={placement}>Content</Float>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('offset', () => {
    it('renders with offset', () => {
      render(<Float offset={10}>Content</Float>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with offsetX and offsetY', () => {
      render(
        <Float offsetX={5} offsetY={10}>
          Content
        </Float>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
