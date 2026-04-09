import { Combobox as ChakraCombobox, createListCollection, Portal } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { ComboboxProps } from './Combobox.types';

const Combobox = ({
  ref,
  items,
  onChange,
  placeholder,
  ...props
}: ComboboxProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const inputRef = useRef<HTMLInputElement>(null);

  const collection = useMemo(
    () =>
      createListCollection({
        items: items || [],
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [items]
  );

  const handleValueChange = (details: { value: Array<string> }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(
        inputRef.current,
        JSON.stringify(details.value)
      );
      onChange(syntheticEvent);
    }
  };

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraCombobox.Root
        ref={ref}
        collection={collection}
        onValueChange={handleValueChange}
        openOnClick
        {...ComboboxStyles}
        {...otherProps}
      >
        <ChakraCombobox.Control>
          <ChakraCombobox.Input placeholder={placeholder} {...InputStyles} />
          <ChakraCombobox.IndicatorGroup>
            <ChakraCombobox.ClearTrigger cursor="pointer" />
            <ChakraCombobox.Trigger cursor="pointer" />
          </ChakraCombobox.IndicatorGroup>
        </ChakraCombobox.Control>
        <Portal>
          <ChakraCombobox.Positioner>
            <ChakraCombobox.Content>
              <ChakraCombobox.ItemGroup>
                {collection.items.map((item) => (
                  <ChakraCombobox.Item key={item.value} item={item} cursor="pointer">
                    {item.label}
                    <ChakraCombobox.ItemIndicator />
                  </ChakraCombobox.Item>
                ))}
              </ChakraCombobox.ItemGroup>
            </ChakraCombobox.Content>
          </ChakraCombobox.Positioner>
        </Portal>
      </ChakraCombobox.Root>
    </FieldWrapper>
  );
};

const ComboboxStyles: StyleProps = {
  width: '100%',
};

const InputStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
  bg: { base: 'white', _dark: 'gray.800' },
  cursor: 'pointer',
};

export { Combobox };
