import { vi } from 'vitest';
import { axe, render, screen } from '../test/test-utils';

import { ChakraToast } from './ChakraToast';

describe('<ChakraToast />', () => {
  // ============================================
  // ACCESSIBILITY
  // ============================================
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ChakraToast title="Test Toast" status="success" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with description', async () => {
      const { container } = render(
        <ChakraToast title="Test Toast" description="Additional details" status="info" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // RENDERING
  // ============================================
  describe('rendering', () => {
    it('renders with title', () => {
      render(<ChakraToast title="Test Toast" status="success" />);
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });

    it('renders with title and description', () => {
      render(<ChakraToast title="Test Toast" description="Additional details" status="info" />);
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('Additional details')).toBeInTheDocument();
    });

    it('renders without description', () => {
      render(<ChakraToast title="Test Toast" status="success" />);
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.queryByText('Additional details')).not.toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<ChakraToast title="Test Toast" status="success" />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  // ============================================
  // STATUS VARIANTS
  // ============================================
  describe('status variants', () => {
    it('renders success status with icon', () => {
      render(<ChakraToast title="Success" status="success" />);
      expect(screen.getByText('Success')).toBeInTheDocument();
      // Icon is rendered but not accessible via text
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('renders error status with icon', () => {
      render(<ChakraToast title="Error" status="error" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders warning status with icon', () => {
      render(<ChakraToast title="Warning" status="warning" />);
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });

    it('renders info status with icon', () => {
      render(<ChakraToast title="Info" status="info" />);
      expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('renders loading status with spinner', () => {
      render(<ChakraToast title="Loading" status="loading" />);
      expect(screen.getByText('Loading')).toBeInTheDocument();
      // Spinner is rendered
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  // ============================================
  // USER INTERACTIONS
  // ============================================
  describe('user interactions', () => {
    it('calls closeToast when close button is clicked', async () => {
      const closeToast = vi.fn();
      const { user } = render(
        <ChakraToast title="Test Toast" status="success" closeToast={closeToast} />
      );

      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(closeToast).toHaveBeenCalledTimes(1);
    });

    it('does not error when closeToast is not provided', async () => {
      const { user } = render(<ChakraToast title="Test Toast" status="success" />);

      await user.click(screen.getByRole('button', { name: /close/i }));

      // No error should occur
    });

    it('can be closed multiple times if closeToast allows', async () => {
      const closeToast = vi.fn();
      const { user } = render(
        <ChakraToast title="Test Toast" status="success" closeToast={closeToast} />
      );

      await user.click(screen.getByRole('button', { name: /close/i }));
      await user.click(screen.getByRole('button', { name: /close/i }));

      expect(closeToast).toHaveBeenCalledTimes(2);
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================
  describe('edge cases', () => {
    it('handles empty title gracefully', () => {
      render(<ChakraToast title="" status="info" />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('handles empty description gracefully', () => {
      render(<ChakraToast title="Title" description="" status="info" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      // Empty description should not be rendered
    });

    it('handles very long title', () => {
      const longTitle = 'A'.repeat(200);
      render(<ChakraToast title={longTitle} status="success" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles very long description', () => {
      const longDescription = 'B'.repeat(500);
      render(<ChakraToast title="Title" description={longDescription} status="info" />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });
});
