import { Box, Field } from '@chakra-ui/react';

import { FieldWrapperDefaultProps, type FieldWrapperProps } from './FieldWrapper.types';

const FieldWrapper = ({
  ref,
  children,
  label = FieldWrapperDefaultProps.label,
  hint = FieldWrapperDefaultProps.hint,
  error = FieldWrapperDefaultProps.error,
  invalid = FieldWrapperDefaultProps.invalid,
  ...props
}: FieldWrapperProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <Field.Root ref={ref} invalid={!!error || invalid} justifyContent="flex-start" {...props}>
      {label && (
        <Field.Label>
          {label}
          <Field.RequiredIndicator />
        </Field.Label>
      )}
      {children}
      {(hint || error) && (
        <Box minHeight="20px">
          {hint && !error && <Field.HelperText>{hint}</Field.HelperText>}
          {error && <Field.ErrorText>{error}</Field.ErrorText>}
        </Box>
      )}
    </Field.Root>
  );
};

export { FieldWrapper };
