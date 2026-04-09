import type { ColorPalette, RadioGroupRootProps } from '@chakra-ui/react';

export interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<RadioGroupRootProps, 'collection' | 'onValueChange' | 'onChange'> {
  // FieldWrapper props
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

  // RadioGroup-specific props
  options?: Array<RadioGroupOption>;
  colorPalette?: ColorPalette;
  variant?: 'outline' | 'solid' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RadioGroupDefaultProps: RadioGroupProps = {
  orientation: 'vertical',
  colorPalette: 'blue',
  variant: 'outline',
  size: 'md',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
};
