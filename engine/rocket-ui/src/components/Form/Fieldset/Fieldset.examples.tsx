import { ExampleSection } from '@components/_examples';
import { Checkbox } from '@components/Form/Checkbox';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Fieldset } from './Fieldset';

export const FieldsetExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Box width="350px">
          <Fieldset legend="Contact Information" helperText="We'll never share your info">
            <Flex.V gap="3">
              <Input label="Name" placeholder="Enter name" />
              <Input label="Email" placeholder="Enter email" />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>

      {/* With helper text */}
      <ExampleSection title="With Helper Text">
        <Box width="350px">
          <Fieldset
            legend="Account Settings"
            helperText="Password must be at least 8 characters long"
          >
            <Flex.V gap="3">
              <Input label="Username" placeholder="Choose a username" />
              <Input label="Password" type="password" placeholder="Create a password" />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>

      {/* With error */}
      <ExampleSection title="With Error">
        <Box width="350px">
          <Fieldset legend="Address" errorText="Please complete all address fields">
            <Flex.V gap="3">
              <Input label="Street" placeholder="123 Main St" />
              <Input label="City" placeholder="New York" />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection title="Disabled">
        <Box width="350px">
          <Fieldset disabled legend="Payment Details (Disabled)">
            <Flex.V gap="3">
              <Input label="Card Number" placeholder="**** **** **** 1234" />
              <Input label="Expiry" placeholder="MM/YY" />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>

      {/* With checkboxes */}
      <ExampleSection title="With Checkboxes">
        <Box width="350px">
          <Fieldset
            legend="Notification Preferences"
            helperText="Choose how you want to be notified"
          >
            <Flex.V gap="2">
              <Checkbox label="Email notifications" defaultChecked />
              <Checkbox label="SMS notifications" />
              <Checkbox label="Push notifications" defaultChecked />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>

      {/* Nested fieldsets */}
      <ExampleSection title="Complex Form">
        <Box width="400px">
          <Fieldset legend="Registration Form" helperText="All fields are required">
            <Flex.V gap="4">
              <Flex.H gap="3">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </Flex.H>
              <Input label="Email" type="email" placeholder="john@example.com" />
              <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            </Flex.V>
          </Fieldset>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
