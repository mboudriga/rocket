import type { InputProps as ChakraInputProps } from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  /** A sub label that appears below the component */
  hint?: string;
  /** If present, it will replace the hint and apply invalid styles */
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: ChakraInputProps['value'];
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const InputDefaultProps: InputProps = {
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
