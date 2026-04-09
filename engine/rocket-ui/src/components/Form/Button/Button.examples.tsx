import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Button } from './Button';

export const ButtonExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <Button variant="solid">Solid</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="surface">Surface</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="plain">Plain</Button>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <Button size="2xs">2xs</Button>
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
          <Button size="lg">lg</Button>
          <Button size="xl">xl</Button>
          <Button size="2xl">2xl</Button>
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          <Button colorPalette="blue">Blue</Button>
          <Button colorPalette="green">Green</Button>
          <Button colorPalette="red">Red</Button>
          <Button colorPalette="purple">Purple</Button>
          <Button colorPalette="orange">Orange</Button>
          <Button colorPalette="teal">Teal</Button>
          <Button colorPalette="gray">Gray</Button>
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="3" wrap="wrap">
          <Button disabled>Disabled</Button>
          <Button loading aria-label="Loading">Loading</Button>
          <Button loading loadingText="Saving...">
            Submit
          </Button>
        </Flex.H>
      </ExampleSection>

      {/* Outline variants with colors */}
      <ExampleSection title="Outline with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Button variant="outline" colorPalette="blue">
            Blue
          </Button>
          <Button variant="outline" colorPalette="green">
            Green
          </Button>
          <Button variant="outline" colorPalette="red">
            Red
          </Button>
          <Button variant="outline" colorPalette="purple">
            Purple
          </Button>
        </Flex.H>
      </ExampleSection>

      {/* Subtle with Colors */}
      <ExampleSection title="Subtle with Colors">
        <Flex.H gap="3" wrap="wrap">
          <Button variant="subtle" colorPalette="blue">
            Blue
          </Button>
          <Button variant="subtle" colorPalette="green">
            Green
          </Button>
          <Button variant="subtle" colorPalette="red">
            Red
          </Button>
          <Button variant="subtle" colorPalette="purple">
            Purple
          </Button>
          <Button variant="subtle" colorPalette="orange">
            Orange
          </Button>
          <Button variant="subtle" colorPalette="teal">
            Teal
          </Button>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
