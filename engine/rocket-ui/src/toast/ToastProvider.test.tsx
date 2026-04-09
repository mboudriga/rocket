import { render, screen } from '../test/test-utils';
import { ToastProvider } from './ToastProvider';

describe('<ToastProvider />', () => {
  // ============================================
  // RENDERING
  // ============================================
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(
        <ToastProvider>
          <div>Test Child Content</div>
        </ToastProvider>
      );

      expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    });

    it('renders ToastContainer in the document', () => {
      const { container } = render(
        <ToastProvider>
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });

    it('renders with default props applied to ToastContainer', () => {
      const { container } = render(
        <ToastProvider>
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });
  });

  // ============================================
  // PROP OVERRIDES
  // ============================================
  describe('prop overrides', () => {
    it('accepts position prop override', () => {
      const { container } = render(
        <ToastProvider position="top-center">
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });

    it('accepts autoClose prop override', () => {
      const { container } = render(
        <ToastProvider autoClose={3000}>
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });

    it('accepts hideProgressBar prop override', () => {
      const { container } = render(
        <ToastProvider hideProgressBar>
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });

    it('accepts multiple prop overrides simultaneously', () => {
      const { container } = render(
        <ToastProvider position="top-right" hideProgressBar autoClose={1000}>
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });

    it('merges custom props with default props', () => {
      const { container } = render(
        <ToastProvider position="top-left">
          <div>Test Content</div>
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.Toastify');
      expect(toastContainer).toBeInTheDocument();
    });
  });
});
