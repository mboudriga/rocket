import { PinInput as ChakraPinInput } from '@chakra-ui/react';
import { Flex } from '@components/Layout/Flex';
import { useMemo, useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent } from '../../../utils';

import { PinInputDefaultProps, type PinInputProps } from './PinInput.types';

const PinInput = ({
  ref,
  length = PinInputDefaultProps.length,
  onChange,
  ...props
}: PinInputProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: Array<string> }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value.join(''));
      onChange(syntheticEvent);
    }
  };

  const inputs = useMemo(() => {
    if (length && length > 0) {
      const pins: Array<React.ReactNode> = [];
      for (let i = 0; i < length; i++) {
        pins.push(<ChakraPinInput.Input key={i} index={i} {...InputStyles} />);
      }
      return pins;
    }
    return null;
  }, [length]);

  return (
    <Flex.H ref={ref} gap={2} width="fit-content">
      <ChakraPinInput.Root onValueChange={handleValueChange} {...props}>
        <ChakraPinInput.HiddenInput ref={inputRef} />
        <ChakraPinInput.Control>{inputs}</ChakraPinInput.Control>
      </ChakraPinInput.Root>
    </Flex.H>
  );
};

const InputStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
  bg: { base: 'white', _dark: 'gray.800' },
};

export { PinInput };
