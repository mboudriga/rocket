import { Input as ChakraInput } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';
import { popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { InputDefaultProps, type InputProps } from './Input.types';

const Input = ({
  ref,
  variant = InputDefaultProps.variant,
  id,
  ...props
}: InputProps & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const styles = variant === 'flushed' ? FlushedStyles : InputStyles;

  return (
    <FieldWrapper {...poppedProps} id={id}>
      <ChakraInput ref={ref} id={id} variant={variant} {...styles} {...otherProps} />
    </FieldWrapper>
  );
};

const InputStyles: StyleProps = {
  borderColor: 'border',
  bg: 'bg',
};

const FlushedStyles: StyleProps = {
  borderColor: 'border',
};

export { Input };
