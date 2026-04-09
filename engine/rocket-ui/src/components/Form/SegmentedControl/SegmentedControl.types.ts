import type { SegmentGroupRootProps } from '@chakra-ui/react';

export interface SegmentedControlItemProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<SegmentGroupRootProps, 'onChange' | 'onValueChange'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  items?: Array<SegmentedControlItemProps>;
  value?: string;
  defaultValue?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SegmentedControlDefaultProps: SegmentedControlProps = {
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
