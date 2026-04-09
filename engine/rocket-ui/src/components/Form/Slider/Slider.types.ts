import type { ColorPalette, SliderRootProps } from '@chakra-ui/react';

export interface SliderProps extends Omit<SliderRootProps, 'onChange' | 'onValueChange'> {
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: Array<number>;
  defaultValue?: Array<number>;
  min?: number;
  max?: number;
  step?: number;
  colorPalette?: ColorPalette;
  size?: 'sm' | 'md' | 'lg';
  showMarks?: boolean;
  marks?: Array<{ value: number; label?: string }>;
  /** Callback when value changes. event.target.value is JSON-stringified array. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const SliderDefaultProps: SliderProps = {
  orientation: 'horizontal',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  showMarks: false,
};
