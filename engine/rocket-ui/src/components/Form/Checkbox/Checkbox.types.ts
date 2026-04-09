import type { CheckboxRootProps, ColorPalette } from '@chakra-ui/react';

export interface CheckboxProps extends Omit<CheckboxRootProps, 'onChange'> {
  label?: string;
  colorPalette?: ColorPalette;
  variant?: 'outline' | 'solid' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  checked?: CheckboxRootProps['checked'];
  defaultChecked?: CheckboxRootProps['defaultChecked'];
  disabled?: CheckboxRootProps['disabled'];
  invalid?: CheckboxRootProps['invalid'];
  readOnly?: CheckboxRootProps['readOnly'];
  required?: CheckboxRootProps['required'];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const CheckboxDefaultProps: CheckboxProps = {
  colorPalette: 'blue',
  variant: 'solid',
  size: 'md',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
};
