import type { ColorPalette, RatingGroupRootProps } from '@chakra-ui/react';

export interface RatingProps extends Omit<RatingGroupRootProps, 'onChange' | 'onValueChange'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  colorPalette?: ColorPalette;
  size?: 'sm' | 'md' | 'lg';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const RatingDefaultProps: RatingProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  count: 5,
  allowHalf: false,
  size: 'md',
};
