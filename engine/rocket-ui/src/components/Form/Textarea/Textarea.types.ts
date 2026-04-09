import type { TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';

export interface TextareaProps extends ChakraTextareaProps {
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
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export const TextareaDefaultProps: TextareaProps = {
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
