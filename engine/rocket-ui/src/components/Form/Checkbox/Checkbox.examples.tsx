import { ExampleSection } from '@components/_examples';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { type FC, useState } from 'react';
import { Checkbox } from './Checkbox';

export const CheckboxExamples: FC = () => {
  const [checkedItems, setCheckedItems] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean) && !allChecked;

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Flex.H gap="4" wrap="wrap">
          <Checkbox label="Accept terms" />
          <Checkbox label="Subscribe to newsletter" defaultChecked />
        </Flex.H>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.H gap="4" wrap="wrap">
          <Checkbox variant="outline" label="Outline" />
          <Checkbox variant="solid" label="Solid" />
          <Checkbox variant="subtle" label="Subtle" />
        </Flex.H>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Checkbox size="xs" label="Extra small" />
          <Checkbox size="sm" label="Small" />
          <Checkbox size="md" label="Medium" />
          <Checkbox size="lg" label="Large" />
        </Flex.H>
      </ExampleSection>

      {/* Color Palettes */}
      <ExampleSection title="Color Palettes">
        <Flex.H gap="4" wrap="wrap">
          <Checkbox colorPalette="blue" label="Blue" defaultChecked />
          <Checkbox colorPalette="green" label="Green" defaultChecked />
          <Checkbox colorPalette="red" label="Red" defaultChecked />
          <Checkbox colorPalette="purple" label="Purple" defaultChecked />
          <Checkbox colorPalette="orange" label="Orange" defaultChecked />
        </Flex.H>
      </ExampleSection>

      {/* States */}
      <ExampleSection title="States">
        <Flex.H gap="4" wrap="wrap">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" defaultChecked="indeterminate" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Invalid" invalid />
        </Flex.H>
      </ExampleSection>

      {/* Indeterminate */}
      <ExampleSection title="Indeterminate">
        <Flex.V gap="2">
          <Checkbox
            checked={allChecked ? true : someChecked ? 'indeterminate' : false}
            onChange={() =>
              setCheckedItems(allChecked ? [false, false, false] : [true, true, true])
            }
            label="Select all"
          />
          <Flex.V gap="1" paddingLeft="6">
            <Checkbox
              checked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])
              }
              label="Option 1"
            />
            <Checkbox
              checked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])
              }
              label="Option 2"
            />
            <Checkbox
              checked={checkedItems[2]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])
              }
              label="Option 3"
            />
          </Flex.V>
        </Flex.V>
      </ExampleSection>

      <Divider />

      {/* Use Case: Terms Agreement */}
      <ExampleSection title="Use Case: Terms Agreement">
        <Flex.V gap="3">
          <Checkbox label="I agree to the Terms of Service" required />
          <Checkbox label="I agree to the Privacy Policy" required />
          <Checkbox label="Subscribe to newsletter (optional)" />
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
