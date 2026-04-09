import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import type { StyleProps } from '../../../types';
import { popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { TextareaDefaultProps, type TextareaProps } from './Textarea.types';

const Textarea = ({
  ref,
  variant = TextareaDefaultProps.variant,
  id,
  ...props
}: TextareaProps & {
  ref?: React.Ref<HTMLTextAreaElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const styles = variant === 'flushed' ? FlushedStyles : TextareaStyles;

  return (
    <FieldWrapper {...poppedProps} id={id}>
      <ChakraTextarea ref={ref} id={id} variant={variant} {...styles} {...otherProps} />
    </FieldWrapper>
  );
};

const TextareaStyles: StyleProps = {
  borderColor: 'border',
  bg: 'bg',
};

const FlushedStyles: StyleProps = {
  borderColor: 'border',
};

export { Textarea };
