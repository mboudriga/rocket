import type { SelectRootProps } from '@chakra-ui/react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectRootProps, 'collection' | 'onChange' | 'onValueChange'> {
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
  options?: Array<SelectOption>;
  placeholder?: string;
  value?: SelectRootProps['value'];
  defaultValue?: SelectRootProps['defaultValue'];
  defaultOpen?: SelectRootProps['defaultOpen'];
  highlightedValue?: SelectRootProps['highlightedValue'];
  multiple?: SelectRootProps['multiple'];
  closeOnSelect?: SelectRootProps['closeOnSelect'];
  loopFocus?: SelectRootProps['loopFocus'];
  unmountOnExit?: SelectRootProps['unmountOnExit'];
  deselectable?: SelectRootProps['deselectable'];
  /** Callback when value changes. event.target.value is JSON-stringified array. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SelectDefaultProps: SelectProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  placeholder: '',
  defaultOpen: false,
  multiple: false,
  closeOnSelect: true,
  loopFocus: false,
  unmountOnExit: false,
  deselectable: true,
};
