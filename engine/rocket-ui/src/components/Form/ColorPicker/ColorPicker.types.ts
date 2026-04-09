import type { ColorPickerRootProps } from '@chakra-ui/react';

export interface ColorPickerProps
  extends Omit<ColorPickerRootProps, 'onChange' | 'onValueChange' | 'value' | 'defaultValue'> {
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const ColorPickerDefaultProps: ColorPickerProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  size: 'md',
};
