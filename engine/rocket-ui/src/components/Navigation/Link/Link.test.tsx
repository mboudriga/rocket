import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Link } from './Link';

describe('<Link />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Link href="https://example.com">Accessible Link</Link>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Link href="#">Click me</Link>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders with href', () => {
      render(<Link href="https://example.com">External Link</Link>);
      const link = screen.getByRole('link', { name: 'External Link' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders with custom className', () => {
      render(
        <Link href="#" className="custom-link">
          Link
        </Link>
      );
      expect(screen.getByRole('link', { name: 'Link' })).toHaveClass('custom-link');
    });
  });

  describe('variants', () => {
    it.each(['underline', 'plain'] as const)('renders with variant="%s"', (variant) => {
      render(<Link variant={variant}>{variant} link</Link>);
      expect(screen.getByText(`${variant} link`)).toBeInTheDocument();
    });
  });

  describe('external links', () => {
    it('renders with target="_blank" for external links', () => {
      render(
        <Link href="https://example.com" target="_blank">
          External
        </Link>
      );
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });

    it('renders with rel="noopener noreferrer" for external links', () => {
      render(
        <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
          External
        </Link>
      );
      expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Link.Box', () => {
    it('renders LinkBox component', () => {
      render(
        <Link.Box>
          <div>Clickable area</div>
        </Link.Box>
      );
      expect(screen.getByText('Clickable area')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Link ref={ref} href="/">
          Link
        </Link>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(
        <Link className="custom-class" data-testid="test" href="/">
          Link
        </Link>
      );
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });
});
