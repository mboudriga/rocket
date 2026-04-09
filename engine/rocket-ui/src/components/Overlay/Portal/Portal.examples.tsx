import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Portal } from './Portal';

export const PortalExamples: FC = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showFixed, setShowFixed] = useState(false);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Button onClick={() => setShowBasic(!showBasic)}>
          {showBasic ? 'Hide' : 'Show'} Portal Content
        </Button>
        {showBasic && (
          <Portal>
            <Box
              position="fixed"
              bottom="100px"
              right="20px"
              padding="4"
              bg="bg.panel"
              boxShadow="lg"
              borderRadius="md"
              border="1px solid"
              borderColor="border"
              zIndex="1000"
            >
              <Text fontWeight="semibold" marginBottom="2">
                Portal Content
              </Text>
              <Text fontSize="sm" color="fg.muted">
                This content is rendered outside the component tree.
              </Text>
              <Button size="sm" marginTop="3" onClick={() => setShowBasic(false)}>
                Close
              </Button>
            </Box>
          </Portal>
        )}
      </ExampleSection>

      {/* Escaping overflow */}
      <ExampleSection title="Escaping Overflow Hidden">
        <Box
          position="relative"
          padding="4"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          overflow="hidden"
          height="150px"
        >
          <Text fontSize="sm" color="fg.muted" marginBottom="3">
            This container has overflow: hidden, but Portal content escapes it.
          </Text>
          <Button size="sm" onClick={() => setShowOverlay(!showOverlay)}>
            {showOverlay ? 'Hide' : 'Show'} Overlapping Element
          </Button>
          {showOverlay && (
            <Portal>
              <Box
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                padding="6"
                bg="bg.panel"
                boxShadow="xl"
                borderRadius="lg"
                border="1px solid"
                borderColor="border"
                zIndex="1000"
              >
                <Text fontWeight="semibold" marginBottom="2">
                  I escaped!
                </Text>
                <Text fontSize="sm" color="fg.muted" marginBottom="3">
                  This element is rendered via Portal and appears above everything.
                </Text>
                <Button size="sm" onClick={() => setShowOverlay(false)}>
                  Close
                </Button>
              </Box>
            </Portal>
          )}
        </Box>
      </ExampleSection>

      <Divider />

      {/* Use case: Toast notification */}
      <ExampleSection title="Use Case: Toast Notification">
        <Button colorPalette="green" onClick={() => setShowFixed(!showFixed)}>
          Show Toast
        </Button>
        {showFixed && (
          <Portal>
            <Box
              position="fixed"
              top="20px"
              right="20px"
              padding="4"
              bg="green.solid"
              color="green.contrast"
              borderRadius="md"
              boxShadow="lg"
              zIndex="1000"
              maxWidth="300px"
            >
              <Flex.H justify="space-between" align="start" gap="3">
                <Box>
                  <Text fontWeight="semibold">Success!</Text>
                  <Text fontSize="sm" opacity="0.9">
                    Your changes have been saved successfully.
                  </Text>
                </Box>
                <Button
                  size="xs"
                  variant="ghost"
                  colorPalette="whiteAlpha"
                  onClick={() => setShowFixed(false)}
                >
                  ✕
                </Button>
              </Flex.H>
            </Box>
          </Portal>
        )}
      </ExampleSection>

      {/* Explanation */}
      <Box
        padding="4"
        bg="blue.subtle"
        borderRadius="md"
        borderColor="blue.muted"
        borderWidth="1px"
      >
        <Text fontWeight="semibold" marginBottom="2" color="blue.fg">
          What is Portal?
        </Text>
        <Flex.V gap="2" fontSize="sm" color="blue.fg">
          <Text>
            Portal renders its children into a DOM node that exists outside the parent component's
            DOM hierarchy.
          </Text>
          <Text>This is useful for:</Text>
          <Box as="ul" paddingLeft="5">
            <li>Modals and dialogs that need to appear above all content</li>
            <li>Tooltips and popovers that need to escape overflow containers</li>
            <li>Toast notifications positioned at screen corners</li>
            <li>Dropdown menus that need to break out of scrollable areas</li>
          </Box>
        </Flex.V>
      </Box>
    </Flex.V>
  );
};
