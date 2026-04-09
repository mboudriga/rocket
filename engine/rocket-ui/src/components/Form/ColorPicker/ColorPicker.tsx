import { ColorPicker as ChakraColorPicker, Portal, parseColor } from '@chakra-ui/react';
import { useRef } from 'react';
import type { StyleProps } from '../../../types';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import type { ColorPickerProps } from './ColorPicker.types';

const ColorPicker = ({
  ref,
  onChange,
  defaultValue,
  value,
  ...props
}: ColorPickerProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);
  const inputRef = useRef<HTMLInputElement>(null);

  // Parse string color values for Chakra UI v3 ColorPicker
  const parsedDefaultValue = defaultValue ? parseColor(defaultValue) : undefined;
  const parsedValue = value ? parseColor(value) : undefined;

  const handleValueChange = (details: { valueAsString: string }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(inputRef.current, details.valueAsString);
      onChange(syntheticEvent);
    }
  };

  return (
    <FieldWrapper {...poppedProps}>
      <ChakraColorPicker.Root
        ref={ref}
        onValueChange={handleValueChange}
        lazyMount={false}
        {...ColorPickerStyles}
        {...otherProps}
        defaultValue={parsedDefaultValue}
        value={parsedValue}
      >
        <ChakraColorPicker.HiddenInput ref={inputRef} aria-label="Color value" />
        <ChakraColorPicker.Control>
          <ChakraColorPicker.Trigger bg="bg" borderColor="border" cursor="pointer">
            <ChakraColorPicker.ValueSwatch />
            <ChakraColorPicker.ValueText />
          </ChakraColorPicker.Trigger>
        </ChakraColorPicker.Control>
        <Portal>
          <ChakraColorPicker.Positioner>
            <ChakraColorPicker.Content bg="bg" borderColor="border">
              <ChakraColorPicker.Area>
                <ChakraColorPicker.AreaBackground />
                <ChakraColorPicker.AreaThumb />
              </ChakraColorPicker.Area>
              <ChakraColorPicker.ChannelSlider channel="hue">
                <ChakraColorPicker.ChannelSliderTrack />
                <ChakraColorPicker.ChannelSliderThumb />
              </ChakraColorPicker.ChannelSlider>
              <ChakraColorPicker.ChannelSlider channel="alpha">
                <ChakraColorPicker.TransparencyGrid />
                <ChakraColorPicker.ChannelSliderTrack />
                <ChakraColorPicker.ChannelSliderThumb />
              </ChakraColorPicker.ChannelSlider>
              <ChakraColorPicker.SwatchGroup>
                <ChakraColorPicker.SwatchTrigger value="red">
                  <ChakraColorPicker.Swatch value="red" />
                </ChakraColorPicker.SwatchTrigger>
                <ChakraColorPicker.SwatchTrigger value="blue">
                  <ChakraColorPicker.Swatch value="blue" />
                </ChakraColorPicker.SwatchTrigger>
                <ChakraColorPicker.SwatchTrigger value="green">
                  <ChakraColorPicker.Swatch value="green" />
                </ChakraColorPicker.SwatchTrigger>
              </ChakraColorPicker.SwatchGroup>
            </ChakraColorPicker.Content>
          </ChakraColorPicker.Positioner>
        </Portal>
      </ChakraColorPicker.Root>
    </FieldWrapper>
  );
};

const ColorPickerStyles: StyleProps = {
  width: '100%',
};

export { ColorPicker };
