import { Select as ChakraSelect, createListCollection, Portal } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { SelectProps } from './Select.types';

const Select = ({
  ref,
  options,
  placeholder,
  onChange,
  label,
  ...props
}: SelectProps & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps({ label, ...props });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: Array<string> }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(
        inputRef.current,
        JSON.stringify(details.value)
      );
      onChange(syntheticEvent);
    }
  };

  const selectCollection = useMemo(
    () =>
      createListCollection({
        items: options || [],
      }),
    [options]
  );

  const selectOptions = useMemo(
    () =>
      options?.map((item) => (
        <ChakraSelect.Item
          item={item}
          key={item.value}
          _hover={{
            cursor: 'pointer',
          }}
        >
          {item.label}
          <ChakraSelect.ItemIndicator />
        </ChakraSelect.Item>
      )) || null,
    [options]
  );

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraSelect.Root
        collection={selectCollection}
        onValueChange={handleValueChange}
        lazyMount={false}
        {...otherProps}
      >
        <input type="hidden" ref={inputRef} />
        <ChakraSelect.Control>
          <ChakraSelect.Trigger ref={ref} aria-label={label || undefined} {...SelectStyles}>
            <ChakraSelect.ValueText placeholder={placeholder} />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>{selectOptions}</ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
    </FieldWrapper>
  );
};

const SelectStyles: StyleProps = {
  borderColor: 'border',
  bg: 'bg',
  _hover: {
    cursor: 'pointer',
  },
};

export { Select };
