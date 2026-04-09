import { type Id, toast as rtToast, type ToastOptions } from 'react-toastify';
import { ChakraToast } from './ChakraToast';

interface ToastConfig extends Omit<ToastOptions, 'type'> {
  description?: string;
}

export const toast = {
  success(title: string, config?: ToastConfig): Id {
    return rtToast(
      ({ closeToast }) =>
        ChakraToast({ title, description: config?.description, status: 'success', closeToast }),
      { autoClose: 3000, ...config }
    );
  },
  error(title: string, config?: ToastConfig): Id {
    return rtToast(
      ({ closeToast }) =>
        ChakraToast({ title, description: config?.description, status: 'error', closeToast }),
      { autoClose: false, ...config }
    );
  },
  warning(title: string, config?: ToastConfig): Id {
    return rtToast(
      ({ closeToast }) =>
        ChakraToast({ title, description: config?.description, status: 'warning', closeToast }),
      config
    );
  },
  info(title: string, config?: ToastConfig): Id {
    return rtToast(
      ({ closeToast }) =>
        ChakraToast({ title, description: config?.description, status: 'info', closeToast }),
      config
    );
  },
  loading(title: string, config?: ToastConfig): Id {
    return rtToast(
      ({ closeToast }) =>
        ChakraToast({ title, description: config?.description, status: 'loading', closeToast }),
      { autoClose: false, isLoading: true, ...config }
    );
  },
  dismiss(id?: Id): void {
    rtToast.dismiss(id);
  },
  promise: rtToast.promise,
} as const;
