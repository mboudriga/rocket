import { createRef } from 'react';
import { axe, render, screen } from '../../../test/test-utils';

import { Avatar } from './Avatar';

describe('<Avatar />', () => {
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Avatar name="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with image', async () => {
      const { container } = render(<Avatar src="https://example.com/avatar.jpg" name="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  it('renders with name as initials', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with image src', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" name="John" />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  describe('fallback behavior', () => {
    it('shows fallback initials when no image is provided', () => {
      render(<Avatar name="Alice Bob" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('shows single initial for single word name', () => {
      render(<Avatar name="Alice" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });

  describe('ref forwarding', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Avatar ref={ref} name="John Doe" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('custom props', () => {
    it('accepts custom className', () => {
      render(<Avatar className="custom-class" data-testid="test" name="John Doe" />);
      expect(screen.getByTestId('test')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('renders with variant="outline" (applies background styles)', () => {
      render(<Avatar name="John Doe" variant="outline" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders with variant="solid" (no extra background styles)', () => {
      render(<Avatar name="John Doe" variant="solid" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders with default variant (no variant prop)', () => {
      render(<Avatar name="John Doe" data-testid="avatar" />);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });
  });
});
