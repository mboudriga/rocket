import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { LuCheck, LuCreditCard, LuPackage, LuTruck, LuUser } from 'react-icons/lu';
import { Steps } from './Steps';

export const StepsExamples: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const basicItems = [
    { title: 'Step 1', description: 'Description' },
    { title: 'Step 2', description: 'Description' },
    { title: 'Step 3', description: 'Description' },
  ];

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Steps defaultStep={1} items={basicItems} />
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" marginBottom="2">
                {size}
              </Text>
              <Steps
                size={size}
                defaultStep={1}
                items={[{ title: 'First' }, { title: 'Second' }, { title: 'Third' }]}
              />
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="6">
          {(['solid', 'subtle'] as const).map((variant) => (
            <Box key={variant}>
              <Text fontSize="xs" color="fg.muted" marginBottom="2">
                {variant}
              </Text>
              <Steps
                variant={variant}
                defaultStep={1}
                items={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
              />
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* With icons */}
      <ExampleSection title="With Icons">
        <Steps
          defaultStep={1}
          items={[
            { title: 'Account', icon: <LuUser size={16} /> },
            { title: 'Payment', icon: <LuCreditCard size={16} /> },
            { title: 'Complete', icon: <LuCheck size={16} /> },
          ]}
        />
      </ExampleSection>

      {/* Vertical orientation */}
      <ExampleSection title="Vertical Orientation">
        <Steps
          orientation="vertical"
          defaultStep={1}
          items={[
            { title: 'Create account', description: 'Sign up with your email' },
            { title: 'Verify email', description: 'Check your inbox' },
            { title: 'Complete profile', description: 'Add your information' },
            { title: 'Start using', description: 'You are ready!' },
          ]}
        />
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled with Navigation">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Steps
            step={currentStep}
            onChange={setCurrentStep}
            items={[{ title: 'Personal Info' }, { title: 'Address' }, { title: 'Review' }]}
          />
          <Box marginTop="4" padding="4" bg="bg.subtle" borderRadius="md" minHeight="80px">
            <Text fontWeight="medium" marginBottom="2">
              {currentStep === 0 && 'Enter your personal information'}
              {currentStep === 1 && 'Enter your address details'}
              {currentStep === 2 && 'Review and submit'}
              {currentStep === 3 && 'All steps completed!'}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Current step: {currentStep}
            </Text>
          </Box>
          <Flex.H gap="2" marginTop="4" justify="end">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={currentStep === 3}
            >
              {currentStep === 2 ? 'Complete' : 'Next'}
            </Button>
          </Flex.H>
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: Checkout process */}
      <ExampleSection title="Use Case: Checkout Process">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Steps
            defaultStep={2}
            items={[
              { title: 'Cart', description: 'Review items', icon: <LuPackage size={16} /> },
              { title: 'Shipping', description: 'Delivery address', icon: <LuTruck size={16} /> },
              { title: 'Payment', description: 'Payment method', icon: <LuCreditCard size={16} /> },
              { title: 'Confirm', description: 'Place order', icon: <LuCheck size={16} /> },
            ]}
          />
        </Box>
      </ExampleSection>

      {/* Use case: Form wizard */}
      <ExampleSection title="Use Case: Multi-step Form">
        <Box border="1px solid" borderColor="border" borderRadius="lg" padding="4">
          <Steps
            size="sm"
            defaultStep={0}
            items={[
              { title: 'Basic Info' },
              { title: 'Contact' },
              { title: 'Preferences' },
              { title: 'Review' },
              { title: 'Submit' },
            ]}
          />
          <Box marginTop="4" padding="4" bg="bg.subtle" borderRadius="md">
            <Text fontWeight="medium" marginBottom="2">
              Step 1: Basic Information
            </Text>
            <Flex.V gap="2">
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Full Name
                </Text>
                <Box
                  padding="2"
                  bg="bg.panel"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="border"
                >
                  <Text fontSize="sm" color="fg.muted">
                    Enter your name
                  </Text>
                </Box>
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  Date of Birth
                </Text>
                <Box
                  padding="2"
                  bg="bg.panel"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="border"
                >
                  <Text fontSize="sm" color="fg.muted">
                    Select date
                  </Text>
                </Box>
              </Box>
            </Flex.V>
          </Box>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
