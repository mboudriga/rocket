import type { ReactNode } from 'react';
import { Slide, ToastContainer, type ToastContainerProps } from 'react-toastify';
import './toast-theme.css';

const defaults: Partial<ToastContainerProps> = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  transition: Slide,
};

export interface ToastProviderProps extends Partial<ToastContainerProps> {
  children: ReactNode;
}

export function ToastProvider({ children, ...overrides }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer {...defaults} {...overrides} />
    </>
  );
}
