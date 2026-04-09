import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { QRCode } from './QRCode';

describe('<QRCode />', () => {
  it('renders with default props', () => {
    render(<QRCode value="https://example.com" data-testid="qr-code" />);
    expect(screen.getByTestId('qr-code')).toBeInTheDocument();
  });

  it('renders with text value', () => {
    render(<QRCode value="Hello World" data-testid="qr-code" />);
    expect(screen.getByTestId('qr-code')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<QRCode value="https://example.com" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('size variants', () => {
    it('renders with size="xs"', () => {
      render(<QRCode value="https://example.com" size="xs" data-testid="qr-xs" />);
      expect(screen.getByTestId('qr-xs')).toBeInTheDocument();
    });

    it('renders with size="sm"', () => {
      render(<QRCode value="https://example.com" size="sm" data-testid="qr-sm" />);
      expect(screen.getByTestId('qr-sm')).toBeInTheDocument();
    });

    it('renders with size="lg"', () => {
      render(<QRCode value="https://example.com" size="lg" data-testid="qr-lg" />);
      expect(screen.getByTestId('qr-lg')).toBeInTheDocument();
    });

    it('renders with size="xl"', () => {
      render(<QRCode value="https://example.com" size="xl" data-testid="qr-xl" />);
      expect(screen.getByTestId('qr-xl')).toBeInTheDocument();
    });

    it('renders with size="2xl"', () => {
      render(<QRCode value="https://example.com" size="2xl" data-testid="qr-2xl" />);
      expect(screen.getByTestId('qr-2xl')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty string value', () => {
      render(<QRCode value="" data-testid="qr-empty" />);
      expect(screen.getByTestId('qr-empty')).toBeInTheDocument();
    });

    it('handles very long URL', () => {
      const longUrl = `https://example.com/${'a'.repeat(1000)}`;
      render(<QRCode value={longUrl} data-testid="qr-long" />);
      expect(screen.getByTestId('qr-long')).toBeInTheDocument();
    });

    it('handles special characters in value', () => {
      render(<QRCode value="Hello @World! #Test & More" data-testid="qr-special" />);
      expect(screen.getByTestId('qr-special')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<QRCode ref={ref} value="https://example.com" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<QRCode className="custom-class" data-testid="test" value="https://example.com" />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
