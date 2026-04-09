import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import type { FC } from 'react';
import { FieldWrapper } from './FieldWrapper';

export const FieldWrapperExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <FieldWrapper label="Email" id="email-basic">
          <input
            id="email-basic"
            type="email"
            placeholder="Enter email"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </FieldWrapper>
      </ExampleSection>

      {/* With hint */}
      <ExampleSection title="With Hint">
        <Box width="300px">
          <FieldWrapper label="Email" hint="We'll never share your email" id="email-hint">
            <input
              id="email-hint"
              type="email"
              placeholder="Enter email"
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
          </FieldWrapper>
        </Box>
      </ExampleSection>

      {/* Orientation */}
      <ExampleSection title="Orientation">
        <Flex.V gap="4">
          <Box width="300px">
            <FieldWrapper orientation="vertical" label="Vertical (default)" id="vertical">
              <input
                id="vertical"
                type="text"
                placeholder="Enter text"
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                }}
              />
            </FieldWrapper>
          </Box>
          <Box width="400px">
            <FieldWrapper orientation="horizontal" label="Horizontal" id="horizontal">
              <input
                id="horizontal"
                type="text"
                placeholder="Enter text"
                style={{
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                }}
              />
            </FieldWrapper>
          </Box>
        </Flex.V>
      </ExampleSection>

      {/* With error */}
      <ExampleSection title="With Error">
        <Box width="300px">
          <FieldWrapper label="Password" error="Password is required" id="password-error">
            <input
              id="password-error"
              type="password"
              placeholder="Enter password"
              style={{
                padding: '8px',
                border: '1px solid #e53e3e',
                borderRadius: '4px',
                width: '100%',
              }}
            />
          </FieldWrapper>
        </Box>
      </ExampleSection>

      {/* Required */}
      <ExampleSection title="Required">
        <Box width="300px">
          <FieldWrapper label="Full Name" required id="name-required">
            <input
              id="name-required"
              type="text"
              placeholder="Enter name"
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
          </FieldWrapper>
        </Box>
      </ExampleSection>

      {/* Disabled */}
      <ExampleSection title="Disabled">
        <Box width="300px">
          <FieldWrapper label="Disabled Field" disabled id="disabled">
            <input
              id="disabled"
              type="text"
              placeholder="Disabled"
              disabled
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                opacity: 0.5,
              }}
            />
          </FieldWrapper>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
