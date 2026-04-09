import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { LuPencil, LuPlus, LuSettings, LuTrash2, LuX } from 'react-icons/lu';
import { IconButton } from './IconButton';

export const IconButtonExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="3" wrap="wrap">
          <IconButton aria-label="Solid" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Subtle" variant="subtle">
            <LuPencil />
          </IconButton>
          <IconButton aria-label="Surface" variant="surface">
            <LuSettings />
          </IconButton>
          <IconButton aria-label="Outline" variant="outline">
            <LuX />
          </IconButton>
          <IconButton aria-label="Ghost" variant="ghost">
            <LuTrash2 />
          </IconButton>
          <IconButton aria-label="Plain" variant="plain">
            <LuPlus />
          </IconButton>
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap" align="center">
          <IconButton aria-label="Extra small" size="xs">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Small" size="sm">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Medium" size="md">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Large" size="lg">
            <LuPlus />
          </IconButton>
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="3" wrap="wrap">
          <IconButton aria-label="Blue" colorPalette="blue" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Green" colorPalette="green" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Red" colorPalette="red" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Purple" colorPalette="purple" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Orange" colorPalette="orange" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Teal" colorPalette="teal" variant="solid">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Gray" colorPalette="gray" variant="solid">
            <LuPlus />
          </IconButton>
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="3" wrap="wrap">
          <IconButton aria-label="Disabled" disabled>
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Loading" loading>
            <LuPlus />
          </IconButton>
        </Flex.H>
      </ExampleSection>

      {/* Outline variants with colors */}
      <ExampleSection title="Outline with Colors">
        <Flex.H gap="3" wrap="wrap">
          <IconButton aria-label="Blue" variant="outline" colorPalette="blue">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Green" variant="outline" colorPalette="green">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Red" variant="outline" colorPalette="red">
            <LuPlus />
          </IconButton>
          <IconButton aria-label="Purple" variant="outline" colorPalette="purple">
            <LuPlus />
          </IconButton>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use Case: Toolbar Actions */}
      <ExampleSection title="Use Case: Toolbar Actions">
        <Flex.H
          gap="1"
          padding="2"
          borderWidth="1px"
          borderColor="border"
          borderRadius="md"
          width="fit-content"
        >
          <IconButton aria-label="Edit" variant="ghost" size="sm">
            <LuPencil />
          </IconButton>
          <IconButton aria-label="Settings" variant="ghost" size="sm">
            <LuSettings />
          </IconButton>
          <IconButton aria-label="Delete" variant="ghost" size="sm" colorPalette="red">
            <LuTrash2 />
          </IconButton>
        </Flex.H>
      </ExampleSection>
    </Flex.V>
  );
};
