import { ExampleSection } from '@components/_examples';
import { Box } from '@components/Layout/Box';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Accordion } from './Accordion';

export const AccordionExamples: FC = () => {
  const [controlled, setControlled] = useState<Array<string>>(['item-1']);

  const basicItems = [
    {
      value: 'item-1',
      title: 'What is React?',
      content: (
        <Text fontSize="sm">
          React is a JavaScript library for building user interfaces. It lets you create reusable UI
          components and efficiently update the DOM.
        </Text>
      ),
    },
    {
      value: 'item-2',
      title: 'What is TypeScript?',
      content: (
        <Text fontSize="sm">
          TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds
          optional static typing and class-based features.
        </Text>
      ),
    },
    {
      value: 'item-3',
      title: 'What is Chakra UI?',
      content: (
        <Text fontSize="sm">
          Chakra UI is a simple, modular and accessible component library that gives you the
          building blocks to build React applications.
        </Text>
      ),
    },
  ];

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Accordion id="basic" items={basicItems} />
      </ExampleSection>

      {/* Variants */}
      <ExampleSection title="Variants">
        <Flex.V gap="4">
          {(['enclosed', 'outline', 'subtle', 'plain'] as const).map((variant) => (
            <Box key={variant}>
              <Text fontSize="xs" color="fg.muted" marginBottom="1">
                {variant}
              </Text>
              <Accordion
                variant={variant}
                items={[
                  {
                    value: '1',
                    title: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Item 1`,
                    content: <Text fontSize="sm">Content for item 1</Text>,
                  },
                  {
                    value: '2',
                    title: `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Item 2`,
                    content: <Text fontSize="sm">Content for item 2</Text>,
                  },
                ]}
              />
            </Box>
          ))}
        </Flex.V>
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.V gap="4">
          {(['sm', 'md', 'lg'] as const).map((size) => {
            const sizeLabel = { sm: 'Small', md: 'Medium', lg: 'Large' }[size];
            return (
              <Box key={size}>
                <Text fontSize="xs" color="fg.muted" marginBottom="1">
                  {size}
                </Text>
                <Accordion
                  size={size}
                  items={[
                    {
                      value: '1',
                      title: `${sizeLabel} Accordion Item`,
                      content: <Text fontSize="sm">Content here</Text>,
                    },
                  ]}
                />
            </Box>
            );
          })}
        </Flex.V>
      </ExampleSection>

      {/* Multiple items open */}
      <ExampleSection title="Multiple Items Open">
        <Accordion
          id="multiple"
          multiple
          defaultValue={['item-1', 'item-2']}
          items={[
            {
              value: 'item-1',
              title: 'How does JSX work?',
              content: (
                <Text fontSize="sm">
                  JSX is a syntax extension that lets you write HTML-like markup inside JavaScript.
                  It gets compiled to regular JavaScript function calls.
                </Text>
              ),
            },
            {
              value: 'item-2',
              title: 'What are hooks?',
              content: (
                <Text fontSize="sm">
                  Hooks let you use state and other React features without writing a class. Common
                  hooks include useState, useEffect, and useContext.
                </Text>
              ),
            },
            {
              value: 'item-3',
              title: 'What is the virtual DOM?',
              content: (
                <Text fontSize="sm">
                  The virtual DOM is a lightweight copy of the real DOM that React uses to determine
                  the most efficient way to update the browser DOM.
                </Text>
              ),
            },
          ]}
        />
      </ExampleSection>

      {/* Non-collapsible */}
      <ExampleSection title="Non-collapsible (always one open)">
        <Accordion
          id="non-collapsible"
          collapsible={false}
          defaultValue={['item-1']}
          items={[
            {
              value: 'item-1',
              title: 'First Item',
              content: <Text fontSize="sm">This cannot be collapsed while another is open</Text>,
            },
            {
              value: 'item-2',
              title: 'Second Item',
              content: <Text fontSize="sm">One item must always be expanded</Text>,
            },
          ]}
        />
      </ExampleSection>

      {/* Controlled */}
      <ExampleSection title="Controlled">
        <Text fontSize="xs" color="fg.muted" marginBottom="2">
          Open items: {controlled.join(', ') || 'none'}
        </Text>
        <Accordion
          id="controlled"
          value={controlled}
          onValueChange={(e) => setControlled(e.value as Array<string>)}
          items={[
            {
              value: 'item-1',
              title: 'Getting Started',
              content: <Text fontSize="sm">Set up your development environment and install dependencies.</Text>,
            },
            {
              value: 'item-2',
              title: 'Configuration',
              content: <Text fontSize="sm">Configure your project settings and environment variables.</Text>,
            },
            {
              value: 'item-3',
              title: 'Deployment',
              content: <Text fontSize="sm">Deploy your application to production with CI/CD.</Text>,
            },
          ]}
        />
      </ExampleSection>
    </Flex.V>
  );
};
