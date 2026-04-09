import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Switch } from './Switch';

export const SwitchExamples: FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="4" wrap="wrap">
          <Switch label="Off" />
          <Switch label="On" defaultChecked />
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" wrap="wrap">
          <Switch variant="solid" label="Solid" />
          <Switch variant="raised" label="Raised" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Switch size="xs" label="Extra small" />
          <Switch size="sm" label="Small" />
          <Switch size="md" label="Medium" />
          <Switch size="lg" label="Large" />
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="4" wrap="wrap">
          <Switch colorPalette="blue" defaultChecked label="Blue" />
          <Switch colorPalette="green" defaultChecked label="Green" />
          <Switch colorPalette="red" defaultChecked label="Red" />
          <Switch colorPalette="purple" defaultChecked label="Purple" />
          <Switch colorPalette="orange" defaultChecked label="Orange" />
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Switch disabled label="Disabled off" />
          <Switch disabled defaultChecked label="Disabled on" />
          <Switch invalid label="Invalid" />
          <Switch readOnly defaultChecked label="Read only" />
        </Flex.H>
      </ExampleSection>

      {/* With Label */}
      <ExampleSection title="With Label">
        <Flex.V gap="3">
          <Switch label="Enable notifications" />
          <Switch label="Dark mode" />
          <Switch label="Auto-save" defaultChecked />
        </Flex.V>
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Flex.H gap="3" align="center">
          <Switch
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            label="Airplane mode"
          />
          <Text fontSize="sm" color="fg.muted">
            {enabled ? 'On' : 'Off'}
          </Text>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use Case: Settings Toggle */}
      <ExampleSection title="Use Case: Settings Toggle">
        <Flex.V gap="4" maxWidth="sm">
          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="medium">Push notifications</Text>
              <Text fontSize="sm" color="fg.muted">
                Receive alerts on your device
              </Text>
            </Flex.V>
            <Switch aria-label="Push notifications" />
          </Flex.H>
          <Flex.H justify="space-between" align="center">
            <Flex.V gap="0">
              <Text fontWeight="medium">Email digest</Text>
              <Text fontSize="sm" color="fg.muted">
                Weekly summary of activity
              </Text>
            </Flex.V>
            <Switch aria-label="Email digest" defaultChecked />
          </Flex.H>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
