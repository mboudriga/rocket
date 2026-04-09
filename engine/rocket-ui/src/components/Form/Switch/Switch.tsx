import { Switch as ChakraSwitch } from '@chakra-ui/react';
import { useRef } from 'react';

import { createSyntheticChangeEvent } from '../../../utils';
import type { SwitchProps } from './Switch.types';

const Switch = ({
  ref,
  label,
  children,
  checked,
  onChange,
  ...props
}: SwitchProps & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckedChange = (event: { checked: boolean }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(
        inputRef.current,
        String(event.checked),
        event.checked
      );
      onChange(syntheticEvent);
    }
  };

  return (
    <ChakraSwitch.Root checked={checked} onCheckedChange={handleCheckedChange} {...props}>
      <ChakraSwitch.HiddenInput ref={ref ?? inputRef} />
      <ChakraSwitch.Control>
        <ChakraSwitch.Thumb />
      </ChakraSwitch.Control>
      <ChakraSwitch.Label srOnly={!label && !children}>
        {label || children || 'Toggle'}
      </ChakraSwitch.Label>
    </ChakraSwitch.Root>
  );
};

export { Switch };
