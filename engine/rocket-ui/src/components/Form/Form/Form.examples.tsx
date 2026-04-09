import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Form } from './Form';

export const FormExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic form */}
      <ExampleSection title="Basic Form">
        <Box width="350px" padding="4" border="1px solid" borderColor="border" borderRadius="lg">
          <Form id="basic-form" onSubmit={() => alert('Form submitted!')}>
            <Flex.V gap="4">
              <Input label="Name" placeholder="Enter your name" />
              <Input label="Email" type="email" placeholder="Enter your email" />
              <Button type="submit" width="full">
                Submit
              </Button>
            </Flex.V>
          </Form>
        </Box>
      </ExampleSection>

      {/* Contact form */}
      <ExampleSection title="Contact Form">
        <Box width="400px" padding="6" border="1px solid" borderColor="border" borderRadius="lg">
          <Form id="contact-form">
            <Flex.V gap="4">
              <Flex.H gap="4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </Flex.H>
              <Input label="Email" type="email" placeholder="john@example.com" required />
              <Input label="Subject" placeholder="How can we help?" />
              <Flex.H gap="3">
                <Button type="submit">Send Message</Button>
                <Button type="reset" variant="outline">
                  Reset
                </Button>
              </Flex.H>
            </Flex.V>
          </Form>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
