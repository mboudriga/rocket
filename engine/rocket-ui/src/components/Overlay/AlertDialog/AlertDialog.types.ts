import type { DialogRootProps } from '@chakra-ui/react';
import type { ButtonProps } from '@components/Form/Button';

export interface AlertDialogProps extends Omit<DialogRootProps, 'role'> {
  title?: string;
  buttons?: Array<ButtonProps>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  onClose?: () => void;
  onOpenChange?: (details: { open: boolean }) => void;
}

export const AlertDialogDefaultProps: Partial<AlertDialogProps> = {
  size: 'md',
  closeOnEscape: true,
};
