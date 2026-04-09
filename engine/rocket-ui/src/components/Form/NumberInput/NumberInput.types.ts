import type { NumberInputRootProps } from '@chakra-ui/react';

export interface NumberInputProps extends Omit<NumberInputRootProps, 'onChange'> {
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
  value?: NumberInputRootProps['value'];
  min?: NumberInputRootProps['min'];
  max?: NumberInputRootProps['max'];
  step?: NumberInputRootProps['step'];
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  allowMouseWheel?: NumberInputRootProps['allowMouseWheel'];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const NumberInputDefaultProps: NumberInputProps = {
  orientation: 'vertical',
  label: '',
  hint: '',
  error: '',
  disabled: false,
  invalid: false,
  readOnly: false,
  required: false,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  variant: 'outline',
  size: 'md',
  allowMouseWheel: true,
};
