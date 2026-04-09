import type { FieldRootProps } from '@chakra-ui/react';

export interface FieldWrapperProps extends FieldRootProps {
  label?: string;
  /** A sub label that appears below the component */
  hint?: string;
  /** If present, it will replace the hint and apply invalid styles */
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  disabled?: FieldRootProps['disabled'];
  invalid?: FieldRootProps['invalid'];
  readOnly?: FieldRootProps['readOnly'];
  required?: FieldRootProps['required'];
}

export const FieldWrapperDefaultProps: Omit<FieldWrapperProps, 'id'> = {
  label: '',
  hint: '',
  error: '',
  orientation: 'vertical',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
};
