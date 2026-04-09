import { Slider as ChakraSlider } from '@chakra-ui/react';
import { useMemo } from 'react';
import { createSyntheticChangeEvent, popFieldWrapperProps } from '../../../utils';
import { FieldWrapper } from '../FieldWrapper';

import { SliderDefaultProps, type SliderProps } from './Slider.types';

const Slider = ({
  ref,
  onChange,
  showMarks = SliderDefaultProps.showMarks,
  marks,
  ...props
}: SliderProps & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const { poppedProps, otherProps } = popFieldWrapperProps(props);

  const handleValueChange = (details: { value: Array<number> }) => {
    if (onChange) {
      const syntheticEvent = createSyntheticChangeEvent(
        null,
        JSON.stringify(details.value)
      ) as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const sliderMarks = useMemo(
    () =>
      marks?.map(({ value, label }) => (
        <ChakraSlider.Marker key={value} value={value}>
          <ChakraSlider.MarkerIndicator />
          {label != null && <ChakraSlider.MarkerLabel>{label}</ChakraSlider.MarkerLabel>}
        </ChakraSlider.Marker>
      )) || null,
    [marks]
  );

  return (
    <FieldWrapper
      {...poppedProps}
      {...(poppedProps.orientation === 'vertical' && { height: '100%' })}
    >
      <ChakraSlider.Root
        ref={ref}
        onValueChange={handleValueChange}
        orientation={poppedProps.orientation as 'horizontal' | 'vertical'}
        {...(poppedProps.orientation === 'vertical'
          ? { flex: '1', minHeight: 0 }
          : { width: '100%' })}
        {...otherProps}
      >
        <ChakraSlider.Label asChild>
          <label style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            {(poppedProps.label as string) || 'Slider'}
          </label>
        </ChakraSlider.Label>
        <ChakraSlider.Control>
          <ChakraSlider.Track bg="bg.emphasized">
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumbs />
        </ChakraSlider.Control>
        {(showMarks || marks) && <ChakraSlider.MarkerGroup>{sliderMarks}</ChakraSlider.MarkerGroup>}
      </ChakraSlider.Root>
    </FieldWrapper>
  );
};

export { Slider };
