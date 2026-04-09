import type { TagsInputRootProps } from '@chakra-ui/react';

export interface TagsInputProps extends Omit<TagsInputRootProps, 'onChange' | 'onValueChange'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: Array<string>;
  defaultValue?: Array<string>;
  placeholder?: string;
  max?: number;
  allowDuplicates?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'subtle';
  /** Callback when value changes. event.target.value is JSON-stringified array. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const TagsInputDefaultProps: TagsInputProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  allowDuplicates: false,
  size: 'md',
  variant: 'outline',
};
