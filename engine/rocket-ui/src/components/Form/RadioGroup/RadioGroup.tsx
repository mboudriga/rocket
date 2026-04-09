import { RadioGroup as ChakraRadioGroup, VisuallyHidden } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { RadioGroupProps } from './RadioGroup.types';

const RadioGroup = ({
  ref,
  options,
  onChange,
  ...props
}: RadioGroupProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const label = poppedProps.label as string | undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: string | null }) => {
    if (onChange && details.value) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onChange(syntheticEvent);
    }
  };

  const radioItems = useMemo(
    () =>
      options?.map((option, index) => (
        <ChakraRadioGroup.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          _hover={{ cursor: 'pointer' }}
        >
          <ChakraRadioGroup.ItemHiddenInput ref={index === 0 ? inputRef : undefined} />
          <ChakraRadioGroup.ItemIndicator />
          <ChakraRadioGroup.ItemText>{option.label}</ChakraRadioGroup.ItemText>
        </ChakraRadioGroup.Item>
      )) || null,
    [options]
  );

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraRadioGroup.Root
        ref={ref}
        onValueChange={handleValueChange}
        aria-label={label || 'Options'}
        display="flex"
        flexDirection={poppedProps.orientation === 'horizontal' ? 'row' : 'column'}
        gap={poppedProps.orientation === 'horizontal' ? '6' : '3'}
        {...otherProps}
      >
        <VisuallyHidden asChild>
          <ChakraRadioGroup.Label>{label || 'Options'}</ChakraRadioGroup.Label>
        </VisuallyHidden>
        {radioItems}
      </ChakraRadioGroup.Root>
    </FieldWrapper>
  );
};

export { RadioGroup };
