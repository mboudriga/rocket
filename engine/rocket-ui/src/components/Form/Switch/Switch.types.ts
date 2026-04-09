import type { ColorPalette, SwitchRootProps } from '@chakra-ui/react';

export interface SwitchProps extends Omit<SwitchRootProps, 'onChange'> {
  label?: string;
  checked?: boolean;
  colorPalette?: ColorPalette;
  variant?: 'solid' | 'raised';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: SwitchRootProps['disabled'];
  invalid?: SwitchRootProps['invalid'];
  readOnly?: SwitchRootProps['readOnly'];
  required?: SwitchRootProps['required'];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SwitchDefaultProps: SwitchProps = {
  colorPalette: 'blue',
  variant: 'solid',
  size: 'md',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
};
