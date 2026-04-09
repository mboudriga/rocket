import { toast as rtToast } from 'react-toastify';
import { vi } from 'vitest';
import { toast } from './toastService';

// Mock react-toastify - invoke the render function to test ChakraToast integration
vi.mock('react-toastify', () => {
  const toastMock = Object.assign(
    vi.fn((content, _options) => {
      // Invoke the render function to test ChakraToast integration
      if (typeof content === 'function') {
        content({ closeToast: vi.fn() });
      }
      return 'mock-toast-id';
    }),
    {
      dismiss: vi.fn(),
      promise: vi.fn(),
    }
  );

  return {
    toast: toastMock,
    Slide: vi.fn(),
    ToastContainer: vi.fn(() => null),
  };
});

describe('toast service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================
  // TOAST.SUCCESS
  // ============================================
  describe('toast.success', () => {
    it('calls react-toastify toast with success configuration', () => {
      toast.success('Operation successful');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 3000 })
      );
    });

    it('accepts title and description configuration', () => {
      toast.success('Success', { description: 'Your changes were saved' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 3000 })
      );
    });

    it('returns toast ID', () => {
      const id = toast.success('Test');

      expect(id).toBe('mock-toast-id');
    });

    it('uses autoClose of 3000ms by default', () => {
      toast.success('Auto-close test');

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 3000 })
      );
    });

    it('respects custom autoClose duration', () => {
      toast.success('Custom duration', { autoClose: 1000 });

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 1000 })
      );
    });

    it('allows custom configuration', () => {
      toast.success('Test', { autoClose: 2000, pauseOnHover: false });

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          autoClose: 2000,
          pauseOnHover: false,
        })
      );
    });
  });

  // ============================================
  // TOAST.ERROR
  // ============================================
  describe('toast.error', () => {
    it('calls react-toastify toast with error configuration', () => {
      toast.error('Operation failed');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false })
      );
    });

    it('accepts title and description configuration', () => {
      toast.error('Error', { description: 'Something went wrong' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false })
      );
    });

    it('does not auto-close by default', () => {
      toast.error('Persistent error');

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false })
      );
    });

    it('allows custom autoClose override', () => {
      toast.error('Custom error', { autoClose: 5000 });

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 5000 })
      );
    });
  });

  // ============================================
  // TOAST.WARNING
  // ============================================
  describe('toast.warning', () => {
    it('calls react-toastify toast with warning configuration', () => {
      toast.warning('Warning message');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), undefined);
    });

    it('accepts title and description configuration', () => {
      toast.warning('Warning', { description: 'Please review this' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ description: 'Please review this' })
      );
    });

    it('accepts custom configuration', () => {
      toast.warning('Custom warning', { autoClose: 2000 });

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 2000 })
      );
    });
  });

  // ============================================
  // TOAST.INFO
  // ============================================
  describe('toast.info', () => {
    it('calls react-toastify toast with info configuration', () => {
      toast.info('Info message');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), undefined);
    });

    it('accepts title and description configuration', () => {
      toast.info('Information', { description: 'Here is some info' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ description: 'Here is some info' })
      );
    });

    it('accepts custom configuration', () => {
      toast.info('Info', { autoClose: 4000 });

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 4000 })
      );
    });
  });

  // ============================================
  // TOAST.LOADING
  // ============================================
  describe('toast.loading', () => {
    it('calls react-toastify toast with loading configuration', () => {
      toast.loading('Loading data');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false, isLoading: true })
      );
    });

    it('accepts title and description configuration', () => {
      toast.loading('Loading', { description: 'Please wait' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false, isLoading: true })
      );
    });

    it('does not auto-close by default', () => {
      toast.loading('Processing');

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: false, isLoading: true })
      );
    });

    it('sets isLoading flag', () => {
      toast.loading('Loading');

      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ isLoading: true })
      );
    });
  });

  // ============================================
  // TOAST.DISMISS
  // ============================================
  describe('toast.dismiss', () => {
    it('calls react-toastify dismiss', () => {
      const dismissMock = vi.fn();
      vi.mocked(rtToast).dismiss = dismissMock;

      toast.dismiss();

      expect(dismissMock).toHaveBeenCalledTimes(1);
      expect(dismissMock).toHaveBeenCalledWith(undefined);
    });

    it('dismisses specific toast by ID', () => {
      const dismissMock = vi.fn();
      vi.mocked(rtToast).dismiss = dismissMock;

      toast.dismiss('specific-id');

      expect(dismissMock).toHaveBeenCalledWith('specific-id');
    });
  });

  // ============================================
  // TOAST METHOD CALLS
  // ============================================
  describe('toast method calls', () => {
    it('success calls react-toastify with render function', () => {
      toast.success('Test Title', { description: 'Test Description' });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), expect.any(Object));
    });

    it('error calls react-toastify with render function', () => {
      toast.error('Error Title');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), expect.any(Object));
    });

    it('accepts toast without description', () => {
      toast.info('Just Title');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), undefined);
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================
  describe('edge cases', () => {
    it('handles empty title', () => {
      toast.info('');

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(expect.any(Function), undefined);
    });

    it('handles very long title', () => {
      const longTitle = 'A'.repeat(200);
      toast.success(longTitle);

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ autoClose: 3000 })
      );
    });

    it('handles very long description', () => {
      const longDescription = 'B'.repeat(500);
      toast.info('Title', { description: longDescription });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ description: longDescription })
      );
    });

    it('handles undefined description', () => {
      toast.warning('Warning', { description: undefined });

      expect(rtToast).toHaveBeenCalledTimes(1);
      expect(rtToast).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ description: undefined })
      );
    });
  });

  // ============================================
  // TOAST.PROMISE
  // ============================================
  describe('toast.promise', () => {
    it('is exposed from the toast service', () => {
      // toast.promise exists and references the underlying react-toastify promise method
      expect(toast.promise).toBeDefined();
    });
  });

  // ============================================
  // API CONSISTENCY
  // ============================================
  describe('API consistency', () => {
    it('all toast methods return IDs', () => {
      const successId = toast.success('Success');
      const errorId = toast.error('Error');
      const warningId = toast.warning('Warning');
      const infoId = toast.info('Info');
      const loadingId = toast.loading('Loading');

      expect(successId).toBe('mock-toast-id');
      expect(errorId).toBe('mock-toast-id');
      expect(warningId).toBe('mock-toast-id');
      expect(infoId).toBe('mock-toast-id');
      expect(loadingId).toBe('mock-toast-id');
    });

    it('all toast methods accept description', () => {
      toast.success('Success', { description: 'Desc' });
      toast.error('Error', { description: 'Desc' });
      toast.warning('Warning', { description: 'Desc' });
      toast.info('Info', { description: 'Desc' });
      toast.loading('Loading', { description: 'Desc' });

      expect(rtToast).toHaveBeenCalledTimes(5);
    });

    it('all toast methods accept custom config', () => {
      const config = { autoClose: 1000, pauseOnHover: false };

      toast.success('Success', config);
      toast.error('Error', config);
      toast.warning('Warning', config);
      toast.info('Info', config);
      toast.loading('Loading', config);

      expect(rtToast).toHaveBeenCalledTimes(5);
    });
  });
});
