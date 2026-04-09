import type { ComboboxRootProps } from '@chakra-ui/react';

export interface ComboboxItemProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<ComboboxRootProps<ComboboxItemProps>, 'onChange' | 'onValueChange' | 'collection'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  items?: Array<ComboboxItemProps>;
  value?: Array<string>;
  defaultValue?: Array<string>;
  placeholder?: string;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'subtle';
  /** Callback when value changes. event.target.value is JSON-stringified array. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const ComboboxDefaultProps: ComboboxProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  multiple: false,
  size: 'md',
  variant: 'outline',
};
