import type { FieldsetRootProps } from '@chakra-ui/react';

export interface FieldsetProps extends FieldsetRootProps {
  invalid?: boolean;
  disabled?: boolean;
  legend?: string;
  helperText?: string;
  errorText?: string;
}

export const FieldsetDefaultProps: FieldsetProps = {
  invalid: false,
  disabled: false,
  legend: '',
  helperText: '',
  errorText: '',
};
