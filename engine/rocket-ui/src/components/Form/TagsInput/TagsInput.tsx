import { TagsInput as ChakraTagsInput } from '@chakra-ui/react';
import { useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { TagsInputDefaultProps, type TagsInputProps } from './TagsInput.types';

const TagsInput = ({
  ref,
  onChange,
  placeholder,
  allowDuplicates,
  id,
  label = TagsInputDefaultProps.label,
  ...props
}: TagsInputProps & {
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

  return (
    <FieldWrapper {...poppedProps} label={label} id={id}>
      <ChakraTagsInput.Root
        ref={ref}
        ids={id ? { input: id } : undefined}
        onValueChange={handleValueChange}
        {...TagsInputStyles}
        {...otherProps}
      >
        <ChakraTagsInput.Context>
          {(api) => (
            <ChakraTagsInput.Control>
              {api.value.map((value, index) => (
                <ChakraTagsInput.Item key={`${value}-${index}`} index={index} value={value}>
                  <ChakraTagsInput.ItemPreview>
                    <ChakraTagsInput.ItemText _disabled={{ color: 'fg.muted' }}>
                      {value}
                    </ChakraTagsInput.ItemText>
                    <ChakraTagsInput.ItemDeleteTrigger />
                  </ChakraTagsInput.ItemPreview>
                </ChakraTagsInput.Item>
              ))}
              <ChakraTagsInput.Input
                id={id}
                placeholder={placeholder}
                aria-label={label || 'Tags input'}
                pe="6"
              />
              <ChakraTagsInput.ClearTrigger
                position="absolute"
                insetEnd="1.5"
                top="50%"
                transform="translateY(-50%)"
              />
            </ChakraTagsInput.Control>
          )}
        </ChakraTagsInput.Context>
        <ChakraTagsInput.HiddenInput ref={inputRef} aria-label="Tags value" />
      </ChakraTagsInput.Root>
    </FieldWrapper>
  );
};

const TagsInputStyles: StyleProps = {
  width: '100%',
};

export { TagsInput };
