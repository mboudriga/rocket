import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { useRef } from 'react';
import { LuCheck, LuMinus } from 'react-icons/lu';

import { createSyntheticChangeEvent } from '../../../utils';
import type { CheckboxProps } from './Checkbox.types';

const Checkbox = ({
  ref,
  label,
  checked,
  onChange,
  ...props
}: CheckboxProps & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckedChange = (event: { checked: boolean | 'indeterminate' }) => {
    if (onChange) {
      const isChecked = !!event.checked;
      const syntheticEvent = createSyntheticChangeEvent<HTMLInputElement>(
        null,
        String(isChecked),
        isChecked
      );
      onChange(syntheticEvent);
    }
  };

  return (
    <ChakraCheckbox.Root
      checked={checked}
      onCheckedChange={handleCheckedChange}
      cursor="pointer"
      {...props}
    >
      <ChakraCheckbox.HiddenInput ref={ref ?? inputRef} />
      <ChakraCheckbox.Control
        bg={{
          base: 'white',
          _checked: 'colorPalette.solid',
          _indeterminate: 'colorPalette.solid',
        }}
        cursor="pointer"
      >
        <ChakraCheckbox.Indicator
          checked={<LuCheck strokeWidth={3} />}
          indeterminate={<LuMinus strokeWidth={3} />}
        />
      </ChakraCheckbox.Control>
      {label && <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>}
    </ChakraCheckbox.Root>
  );
};

export { Checkbox };
