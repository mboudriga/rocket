import { ExampleSection } from '@components/_examples';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { Alert } from './Alert';

export const AlertExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Alert>This is a basic alert message.</Alert>
      </ExampleSection>

      {/* With title */}
      <ExampleSection title="With Title">
        <Alert title="Information">This alert has a title and description.</Alert>
      </ExampleSection>

      {/* Status */}
      <ExampleSection title="Status">
        <Flex.V gap="3">
          <Alert status="info" title="Info">
            This is an informational alert.
          </Alert>
          <Alert status="success" title="Success">
            Your changes have been saved successfully.
          </Alert>
          <Alert status="warning" title="Warning">
            Please review your settings before proceeding.
          </Alert>
          <Alert status="error" title="Error">
            An error occurred while processing your request.
          </Alert>
          <Alert status="neutral" title="Neutral">
            This is a neutral alert message.
          </Alert>
        </Flex.V>
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="3">
          <Alert variant="subtle" status="info" title="Subtle">
            Subtle variant alert.
          </Alert>
          <Alert variant="surface" status="info" title="Surface">
            Surface variant alert.
          </Alert>
          <Alert variant="outline" status="info" title="Outline">
            Outline variant alert.
          </Alert>
          <Alert variant="solid" status="info" title="Solid">
            Solid variant alert.
          </Alert>
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="3">
          <Alert size="sm" title="Small">
            Small size alert.
          </Alert>
          <Alert size="md" title="Medium">
            Medium size alert.
          </Alert>
          <Alert size="lg" title="Large">
            Large size alert.
          </Alert>
        </Flex.V>
      </ExampleSection>

      {/* Closable */}
      <ExampleSection title="Closable">
        <Flex.V gap="3">
          <Alert
            status="info"
            title="Closable Alert"
            onClose={() => {
              /* no-op */
            }}
          >
            Click the X to close this alert.
          </Alert>
          <Alert
            status="success"
            title="File Uploaded"
            onClose={() => {
              /* no-op */
            }}
          >
            Your file has been uploaded successfully.
          </Alert>
        </Flex.V>
      </ExampleSection>
    </Flex.V>
  );
};
