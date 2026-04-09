import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { ColorPicker } from './ColorPicker';

export const ColorPickerExamples: FC = () => {
  const [color, setColor] = useState('#3182ce');

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <ColorPicker label="Color" defaultValue="#3182CE" />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <ColorPicker label="Extra Small" size="xs" defaultValue="#E53E3E" />
          <ColorPicker label="Small" size="sm" defaultValue="#38A169" />
          <ColorPicker label="Medium" size="md" defaultValue="#805AD5" />
          <ColorPicker label="Large" size="lg" defaultValue="#DD6B20" />
          <ColorPicker label="Extra Large" size="xl" defaultValue="#D53F8C" />
        </Flex.H>
      </ExampleSection>

      {/* With label and hint */}
      <ExampleSection title="With Label and Hint">
        <Flex.H gap="4" wrap="wrap">
          <ColorPicker label="Primary Color" defaultValue="#3182CE" />
          <ColorPicker
            label="Accent Color"
            hint="Choose your brand accent"
            defaultValue="#805AD5"
          />
        </Flex.H>
      </ExampleSection>

      {/* Pre-defined colors */}
      <ExampleSection title="Various Default Colors">
        <Flex.H gap="4" wrap="wrap">
          <ColorPicker label="Red" defaultValue="#E53E3E" />
          <ColorPicker label="Green" defaultValue="#38A169" />
          <ColorPicker label="Blue" defaultValue="#3182CE" />
          <ColorPicker label="Purple" defaultValue="#805AD5" />
          <ColorPicker label="Yellow" defaultValue="#D69E2E" />
          <ColorPicker label="Orange" defaultValue="#DD6B20" />
          <ColorPicker label="Pink" defaultValue="#D53F8C" />
          <ColorPicker label="Teal" defaultValue="#319795" />
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <ColorPicker label="Disabled" defaultValue="#3182CE" disabled />
          <ColorPicker label="Read Only" defaultValue="#3182CE" readOnly />
          <ColorPicker label="Invalid" defaultValue="#3182CE" invalid error="Invalid color" />
        </Flex.H>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Flex.V gap="2">
          <ColorPicker
            value={color}
            onChange={(e) => setColor(e.target.value)}
            label="Pick a color"
          />
          <Text fontSize="sm" color="fg.muted">
            Selected: {color}
          </Text>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
