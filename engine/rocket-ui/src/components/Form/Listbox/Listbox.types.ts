import type { ListboxRootProps } from '@chakra-ui/react';

export interface ListboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ListboxItemGroup {
  label: string;
  items: Array<ListboxItem>;
}

export interface ListboxProps
  extends Omit<ListboxRootProps, 'collection' | 'onChange' | 'onValueChange'> {
  /** Items to display in the listbox */
  items?: Array<ListboxItem>;
  /** Grouped items (alternative to items) */
  groups?: Array<ListboxItemGroup>;
  /** Selection mode */
  selectionMode?: 'single' | 'multiple';
  /** Currently selected value(s) */
  value?: Array<string>;
  /** Default selected value(s) */
  defaultValue?: Array<string>;
  /** Callback when selection changes. event.target.value is JSON-stringified array. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Whether the listbox is disabled */
  disabled?: boolean;
  /** Orientation of the field wrapper */
  orientation?: 'vertical' | 'horizontal';
  /** Loop focus when navigating */
  loopFocus?: boolean;
  /** Label text */
  label?: string;
  /** A sub label that appears below the component */
  hint?: string;
  /** If present, it will replace the hint and apply invalid styles */
  error?: string;
  /** Shows invalid state */
  invalid?: boolean;
  /** Makes listbox read-only */
  readOnly?: boolean;
  /** Shows required indicator */
  required?: boolean;
}

export const ListboxDefaultProps: ListboxProps = {
  selectionMode: 'single',
  orientation: 'vertical',
  loopFocus: false,
  disabled: false,
  label: '',
  hint: '',
  error: '',
  invalid: false,
  readOnly: false,
  required: false,
};
