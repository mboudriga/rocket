import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuSettings, LuUser } from 'react-icons/lu';
import { Popover } from './Popover';

export const PopoverExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Popover trigger={<Button variant="outline">Open Popover</Button>} title="Popover Title">
          <Text>This is the popover content.</Text>
        </Popover>
      </ExampleSection>

      {/* Without title */}
      <ExampleSection title="Without Title">
        <Popover trigger={<Button variant="outline">Click me</Button>}>
          <Text>Simple popover without a title.</Text>
        </Popover>
      </ExampleSection>

      {/* Arrow options */}
      <ExampleSection title="Arrow Options">
        <Flex.H gap="4" wrap="wrap">
          <Popover hasArrow trigger={<Button variant="outline">With Arrow</Button>} title="Arrow">
            <Text>Popover with an arrow pointer.</Text>
          </Popover>
          <Popover
            hasArrow={false}
            trigger={<Button variant="outline">No Arrow</Button>}
            title="No Arrow"
          >
            <Text>Popover without an arrow.</Text>
          </Popover>
        </Flex.H>
      </ExampleSection>

      {/* Close button options */}
      <ExampleSection title="Close Button Options">
        <Flex.H gap="4" wrap="wrap">
          <Popover
            hasCloseButton
            trigger={<Button variant="outline">With Close Button</Button>}
            title="Closable"
          >
            <Text>Click the X to close this popover.</Text>
          </Popover>
          <Popover
            hasCloseButton={false}
            trigger={<Button variant="outline">No Close Button</Button>}
            title="Not Closable"
          >
            <Text>Click outside to close this popover.</Text>
          </Popover>
        </Flex.H>
      </ExampleSection>

      {/* Positioning */}
      <ExampleSection title="Positioning">
        <Flex.H gap="4" wrap="wrap">
          <Popover
            positioning={{ placement: 'top' }}
            trigger={<Button variant="outline">Top</Button>}
            title="Top"
          >
            <Text>Positioned at the top.</Text>
          </Popover>
          <Popover
            positioning={{ placement: 'bottom' }}
            trigger={<Button variant="outline">Bottom</Button>}
            title="Bottom"
          >
            <Text>Positioned at the bottom.</Text>
          </Popover>
          <Popover
            positioning={{ placement: 'left' }}
            trigger={<Button variant="outline">Left</Button>}
            title="Left"
          >
            <Text>Positioned to the left.</Text>
          </Popover>
          <Popover
            positioning={{ placement: 'right' }}
            trigger={<Button variant="outline">Right</Button>}
            title="Right"
          >
            <Text>Positioned to the right.</Text>
          </Popover>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: User profile card */}
      <ExampleSection title="Use Case: User Profile Card">
        <Popover
          hasArrow
          hasCloseButton={false}
          trigger={
            <Button variant="ghost" size="sm">
              <LuUser />
              John Doe
            </Button>
          }
        >
          <Flex.V gap="3">
            <Flex.H gap="3" align="center">
              <Box width="40px" height="40px" borderRadius="full" bg="blue.subtle" />
              <Box>
                <Text fontWeight="semibold">John Doe</Text>
                <Text fontSize="sm" color="fg.muted">
                  john@example.com
                </Text>
              </Box>
            </Flex.H>
            <Flex.H gap="2">
              <Button size="sm" variant="outline">
                View Profile
              </Button>
              <Button size="sm" colorPalette="blue">
                Message
              </Button>
            </Flex.H>
          </Flex.V>
        </Popover>
      </ExampleSection>

      {/* Use case: Quick actions */}
      <ExampleSection title="Use Case: Quick Settings">
        <Popover
          hasArrow
          trigger={
            <Button variant="ghost" size="sm">
              <LuSettings />
              Settings
            </Button>
          }
          title="Quick Settings"
        >
          <Flex.V gap="3">
            <Flex.H justify="space-between" align="center">
              <Text fontSize="sm">Dark Mode</Text>
              <Button size="xs" variant="outline">
                Toggle
              </Button>
            </Flex.H>
            <Flex.H justify="space-between" align="center">
              <Text fontSize="sm">Notifications</Text>
              <Button size="xs" variant="outline">
                Toggle
              </Button>
            </Flex.H>
            <Flex.H justify="space-between" align="center">
              <Text fontSize="sm">Language</Text>
              <Button size="xs" variant="outline">
                English
              </Button>
            </Flex.H>
          </Flex.V>
        </Popover>
      </ExampleSection>
    </Flex.V>
  );
};
