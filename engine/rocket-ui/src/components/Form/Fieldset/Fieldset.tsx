import { Fieldset as ChakraFieldset } from '@chakra-ui/react';
import { FieldsetDefaultProps, type FieldsetProps } from './Fieldset.types';

const Fieldset = ({
  ref,
  legend = FieldsetDefaultProps.legend,
  helperText = FieldsetDefaultProps.helperText,
  errorText = FieldsetDefaultProps.errorText,
  invalid = FieldsetDefaultProps.invalid,
  children,
  ...rest
}: FieldsetProps & {
  ref?: React.Ref<HTMLFieldSetElement>;
}) => {
  return (
    <ChakraFieldset.Root ref={ref} invalid={!!errorText || invalid} {...rest}>
      {legend && <ChakraFieldset.Legend>{legend}</ChakraFieldset.Legend>}
      {children}
      {errorText ? (
        <ChakraFieldset.ErrorText>{errorText}</ChakraFieldset.ErrorText>
      ) : (
        helperText && <ChakraFieldset.HelperText>{helperText}</ChakraFieldset.HelperText>
      )}
    </ChakraFieldset.Root>
  );
};

export { Fieldset };
