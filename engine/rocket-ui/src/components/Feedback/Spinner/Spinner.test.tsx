import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Spinner } from './Spinner';

describe('<Spinner />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Spinner />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders with status role', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(<Spinner />);
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it.each([
      'inherit',
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
    ] as const)('renders with size="%s"', (size) => {
      render(<Spinner size={size} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('color customization', () => {
    it('renders with custom color', () => {
      render(<Spinner color="red.500" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders with colorPalette', () => {
      render(<Spinner colorPalette="green" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('SPAN');
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<Spinner className="custom-class" data-testid="test" />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
