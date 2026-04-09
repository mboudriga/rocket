import { NumberInput as ChakraNumberInput } from '@chakra-ui/react';
import { useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { NumberInputDefaultProps, type NumberInputProps } from './NumberInput.types';

const NumberInput = ({
  ref,
  onChange,
  variant = NumberInputDefaultProps.variant,
  ...props
}: NumberInputProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const inputRef = useRef<HTMLInputElement>(null);
  const styles = variant === 'flushed' ? FlushedStyles : InputStyles;

  const handleValueChange = (details: { value: string }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onChange(syntheticEvent);
    }
  };

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraNumberInput.Root
        ref={ref}
        width="100%"
        variant={variant}
        onValueChange={handleValueChange}
        {...otherProps}
      >
        <ChakraNumberInput.Control />
        <ChakraNumberInput.Input ref={inputRef} {...styles} />
      </ChakraNumberInput.Root>
    </FieldWrapper>
  );
};

const InputStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
  bg: { base: 'white', _dark: 'gray.800' },
};

const FlushedStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
};

export { NumberInput };
