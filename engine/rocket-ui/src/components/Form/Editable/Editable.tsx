import { Editable as ChakraEditable } from '@chakra-ui/react';
import { useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent } from '../../../utils';
import type { EditableProps } from './Editable.types';

const EditableInputStyles: StyleProps = {
  borderColor: { base: 'gray.300', _dark: 'gray.600' },
  bg: { base: 'white', _dark: 'gray.800' },
};

// Create styled Input component
const EditableInput = ({
  ref,
  ...props
}: React.ComponentProps<typeof ChakraEditable.Input> & {
  ref?: React.Ref<HTMLInputElement>;
}) => <ChakraEditable.Input ref={ref} {...EditableInputStyles} {...props} />;

const EditableRoot = ({
  ref,
  onChange,
  onCommit,
  onRevert,
  ...props
}: EditableProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (details: { value: string }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onChange(syntheticEvent);
    }
  };

  const handleValueCommit = (details: { value: string }) => {
    if (onCommit) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onCommit(syntheticEvent);
    }
  };

  const handleValueRevert = (details: { value: string }) => {
    if (onRevert) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.value);
      onRevert(syntheticEvent);
    }
  };

  return (
    <ChakraEditable.Root
      ref={ref}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      onValueRevert={handleValueRevert}
      {...props}
    />
  );
};

// Add role="textbox" so aria-label and aria-readonly (set by Ark) are valid ARIA attributes
const EditablePreview = ({
  ref,
  ...props
}: React.ComponentProps<typeof ChakraEditable.Preview> & {
  ref?: React.Ref<HTMLSpanElement>;
}) => <ChakraEditable.Preview ref={ref} role="textbox" {...props} />;

// Compose with subcomponents - use styled Input
const Editable = Object.assign(EditableRoot, {
  Root: ChakraEditable.Root,
  Label: ChakraEditable.Label,
  Area: ChakraEditable.Area,
  Input: EditableInput,
  Preview: EditablePreview,
  Control: ChakraEditable.Control,
  EditTrigger: ChakraEditable.EditTrigger,
  SubmitTrigger: ChakraEditable.SubmitTrigger,
  CancelTrigger: ChakraEditable.CancelTrigger,
  Context: ChakraEditable.Context,
});

export { Editable };
