import { Listbox as ChakraListbox, createListCollection } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { LuCheck } from 'react-icons/lu';

import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';
import { ListboxDefaultProps, type ListboxItem, type ListboxProps } from './Listbox.types';

const Listbox = ({
  ref,
  items,
  groups,
  selectionMode = ListboxDefaultProps.selectionMode,
  onChange,
  ...props
}: ListboxProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
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

  // Build collection from items or groups
  const collection = useMemo(() => {
    if (groups) {
      const allItems: Array<ListboxItem> = groups.flatMap((group) =>
        group.items.map((item) => ({ ...item, group: group.label }))
      );
      return createListCollection({
        items: allItems,
        groupBy: (item) => item.group ?? '',
      });
    }
    return createListCollection({ items: items || [] });
  }, [items, groups]);

  const renderItems = () => {
    if (groups) {
      return collection.group().map(([groupLabel, groupItems]) => (
        <ChakraListbox.ItemGroup key={groupLabel}>
          <ChakraListbox.ItemGroupLabel>{groupLabel}</ChakraListbox.ItemGroupLabel>
          {groupItems.map((item) => (
            <ChakraListbox.Item key={item.value} item={item} _hover={{ cursor: 'pointer' }}>
              <ChakraListbox.ItemText>{item.label}</ChakraListbox.ItemText>
              <ChakraListbox.ItemIndicator>
                <LuCheck />
              </ChakraListbox.ItemIndicator>
            </ChakraListbox.Item>
          ))}
        </ChakraListbox.ItemGroup>
      ));
    }

    return (items || []).map((item) => (
      <ChakraListbox.Item key={item.value} item={item} _hover={{ cursor: 'pointer' }}>
        <ChakraListbox.ItemText>{item.label}</ChakraListbox.ItemText>
        <ChakraListbox.ItemIndicator>
          <LuCheck />
        </ChakraListbox.ItemIndicator>
      </ChakraListbox.Item>
    ));
  };

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraListbox.Root
        ref={ref}
        collection={collection}
        selectionMode={selectionMode}
        onValueChange={handleValueChange}
        {...otherProps}
      >
        <ChakraListbox.Label
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
        >
          {(poppedProps.label as string) || 'Options'}
        </ChakraListbox.Label>
        <input ref={inputRef} type="hidden" aria-hidden="true" />
        <ChakraListbox.Content>{renderItems()}</ChakraListbox.Content>
      </ChakraListbox.Root>
    </FieldWrapper>
  );
};

export { Listbox };
