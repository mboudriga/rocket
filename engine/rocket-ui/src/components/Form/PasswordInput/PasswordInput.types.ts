import type { InputProps as ChakraInputProps } from '@chakra-ui/react';

export interface PasswordInputProps extends Omit<ChakraInputProps, 'type'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const PasswordInputDefaultProps: PasswordInputProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  variant: 'outline',
  size: 'md',
};
