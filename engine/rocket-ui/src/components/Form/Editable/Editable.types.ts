import type { EditableRootProps } from '@chakra-ui/react';

export interface EditableProps
  extends Omit<
    EditableRootProps,
    'onValueChange' | 'onValueCommit' | 'onValueRevert' | 'onChange'
  > {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  autoResize?: boolean;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  activationMode?: 'focus' | 'dblclick' | 'click' | 'none';
  submitMode?: 'both' | 'enter' | 'blur' | 'none';
  selectOnFocus?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onCommit?: React.ChangeEventHandler<HTMLInputElement>;
  onRevert?: React.ChangeEventHandler<HTMLInputElement>;
}

export const EditableDefaultProps: EditableProps = {
  activationMode: 'focus',
  submitMode: 'both',
  selectOnFocus: true,
  disabled: false,
  readOnly: false,
};
