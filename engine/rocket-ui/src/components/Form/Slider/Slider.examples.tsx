import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Slider } from './Slider';

export const SliderExamples: FC = () => {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box width="300px">
          <Slider defaultValue={[50]} />
        </Box>
      </ExampleSection>

      {/* With label and controlled value */}
      <ExampleSection title="With Label and Value Display">
        <Box width="300px">
          <Slider
            label={`Volume: ${sliderValue[0]}%`}
            value={sliderValue}
            onChange={(e) => setSliderValue(JSON.parse(e.target.value))}
          />
        </Box>
      </ExampleSection>

      {/* With marks */}
      <ExampleSection title="With Marks">
        <Box width="350px">
          <Slider
            showMarks
            marks={[
              { value: 0, label: '0' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 75, label: '75' },
              { value: 100, label: '100' },
            ]}
            defaultValue={[50]}
          />
        </Box>
      </ExampleSection>

      {/* Range slider (two thumbs) */}
      <ExampleSection title="Range Slider (Two Thumbs)">
        <Box width="300px">
          <Slider defaultValue={[25, 75]} />
        </Box>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="6">
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Small
            </Text>
            <Slider size="sm" defaultValue={[50]} />
          </Box>
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Medium
            </Text>
            <Slider size="md" defaultValue={[50]} />
          </Box>
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Large
            </Text>
            <Slider size="lg" defaultValue={[50]} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.V gap="4">
          <Box width="250px">
            <Slider colorPalette="blue" defaultValue={[60]} />
          </Box>
          <Box width="250px">
            <Slider colorPalette="green" defaultValue={[60]} />
          </Box>
          <Box width="250px">
            <Slider colorPalette="red" defaultValue={[60]} />
          </Box>
          <Box width="250px">
            <Slider colorPalette="purple" defaultValue={[60]} />
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* Vertical */}
      <ExampleSection title="Vertical Orientation">
        <Box height="150px">
          <Slider orientation="vertical" defaultValue={[50]} />
        </Box>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.V gap="4">
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Disabled
            </Text>
            <Slider disabled defaultValue={[50]} />
          </Box>
          <Box width="250px">
            <Text fontSize="xs" color="fg.muted" marginBottom="2">
              Read Only
            </Text>
            <Slider readOnly defaultValue={[70]} />
          </Box>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
