import { createRef } from 'react';
import { vi } from 'vitest';
import { axe, render, screen } from '../../../test/test-utils';

import { Alert } from './Alert';

describe('<Alert />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Alert>Alert message</Alert>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders alert content', () => {
      render(<Alert>Alert message</Alert>);
      expect(screen.getByText('Alert message')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Alert title="Important">Alert description</Alert>);
      expect(screen.getByText('Important')).toBeInTheDocument();
      expect(screen.getByText('Alert description')).toBeInTheDocument();
    });

    it('renders without children (title only)', () => {
      render(<Alert title="Title Only" />);
      expect(screen.getByText('Title Only')).toBeInTheDocument();
    });
  });

  describe('status variants', () => {
    it.each([
      'info',
      'warning',
      'success',
      'error',
      'neutral',
    ] as const)('renders with status="%s"', (status) => {
      render(<Alert status={status}>{status} alert</Alert>);
      expect(screen.getByText(`${status} alert`)).toBeInTheDocument();
    });
  });

  describe('visual variants', () => {
    it.each([
      'subtle',
      'surface',
      'outline',
      'solid',
    ] as const)('renders with variant="%s"', (variant) => {
      render(<Alert variant={variant}>{variant} alert</Alert>);
      expect(screen.getByText(`${variant} alert`)).toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders with size="%s"', (size) => {
      render(<Alert size={size}>{size} alert</Alert>);
      expect(screen.getByText(`${size} alert`)).toBeInTheDocument();
    });
  });

  describe('closable behavior', () => {
    it('renders close button when onClose is provided', () => {
      const onClose = vi.fn();
      render(<Alert onClose={onClose}>Closable Alert</Alert>);

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('does not render close button when onClose is not provided', () => {
      render(<Alert>Non-Closable Alert</Alert>);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      const { user } = render(<Alert onClose={onClose}>Closable Alert</Alert>);

      await user.click(screen.getByRole('button', { name: /close/i }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Alert ref={ref}>Alert</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Alert className="custom-class" data-testid="test">
          Alert
        </Alert>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
