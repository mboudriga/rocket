import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import type { FC } from 'react';
import { LuCircleHelp, LuInfo, LuSettings } from 'react-icons/lu';
import { Tooltip } from './Tooltip';

export const TooltipExamples: FC = () => {
  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Tooltip trigger={<Button variant="outline">Hover me</Button>}>This is a tooltip</Tooltip>
      </ExampleSection>

      {/* With arrow */}
      <ExampleSection title="With Arrow">
        <Flex.H gap="4" wrap="wrap">
          <Tooltip trigger={<Button variant="outline">No Arrow</Button>}>
            Tooltip without arrow
          </Tooltip>
          <Tooltip hasArrow trigger={<Button variant="outline">With Arrow</Button>}>
            Tooltip with arrow
          </Tooltip>
        </Flex.H>
      </ExampleSection>

      {/* Positioning */}
      <ExampleSection title="Positioning">
        <Flex.H gap="4" wrap="wrap">
          <Tooltip
            positioning={{ placement: 'top' }}
            hasArrow
            trigger={<Button variant="outline">Top</Button>}
          >
            Top tooltip
          </Tooltip>
          <Tooltip
            positioning={{ placement: 'bottom' }}
            hasArrow
            trigger={<Button variant="outline">Bottom</Button>}
          >
            Bottom tooltip
          </Tooltip>
          <Tooltip
            positioning={{ placement: 'left' }}
            hasArrow
            trigger={<Button variant="outline">Left</Button>}
          >
            Left tooltip
          </Tooltip>
          <Tooltip
            positioning={{ placement: 'right' }}
            hasArrow
            trigger={<Button variant="outline">Right</Button>}
          >
            Right tooltip
          </Tooltip>
        </Flex.H>
      </ExampleSection>

      {/* Custom delays */}
      <ExampleSection title="Custom Delays">
        <Flex.H gap="4" wrap="wrap">
          <Tooltip openDelay={0} trigger={<Button variant="outline">Instant</Button>}>
            No delay
          </Tooltip>
          <Tooltip openDelay={1000} trigger={<Button variant="outline">Delayed (1s)</Button>}>
            1 second delay
          </Tooltip>
        </Flex.H>
      </ExampleSection>

      {/* Different triggers */}
      <ExampleSection title="Different Triggers">
        <Flex.H gap="4" wrap="wrap" align="center">
          <Tooltip hasArrow trigger={<Button colorPalette="blue">Button</Button>}>
            Button tooltip
          </Tooltip>
          <Tooltip
            hasArrow
            trigger={
              <Text as="span" textDecoration="underline" cursor="help">
                Hover this text
              </Text>
            }
          >
            Text tooltip
          </Tooltip>
          <Tooltip
            hasArrow
            trigger={
              <Box as="span" cursor="help">
                <LuInfo />
              </Box>
            }
          >
            Icon tooltip
          </Tooltip>
        </Flex.H>
      </ExampleSection>

      <Divider />

      {/* Use case: Form hints */}
      <ExampleSection title="Use Case: Form Hints">
        <Flex.V gap="3" maxWidth="300px">
          <Flex.H gap="2" align="center">
            <Text>Username</Text>
            <Tooltip
              hasArrow
              trigger={
                <Box as="span" cursor="help" color="fg.muted">
                  <LuCircleHelp size={14} />
                </Box>
              }
            >
              Username must be 3-20 characters long and can only contain letters, numbers, and
              underscores.
            </Tooltip>
          </Flex.H>
          <Flex.H gap="2" align="center">
            <Text>Password</Text>
            <Tooltip
              hasArrow
              trigger={
                <Box as="span" cursor="help" color="fg.muted">
                  <LuCircleHelp size={14} />
                </Box>
              }
            >
              Password must be at least 8 characters and include uppercase, lowercase, and numbers.
            </Tooltip>
          </Flex.H>
        </Flex.V>
      </ExampleSection>

      {/* Use case: Icon buttons */}
      <ExampleSection title="Use Case: Icon Buttons">
        <Flex.H gap="2">
          <Tooltip
            hasArrow
            trigger={
              <Button variant="ghost" size="sm" aria-label="Settings">
                <LuSettings />
              </Button>
            }
          >
            Settings
          </Tooltip>
          <Tooltip
            hasArrow
            trigger={
              <Button variant="ghost" size="sm" aria-label="Help & Support">
                <LuCircleHelp />
              </Button>
            }
          >
            Help & Support
          </Tooltip>
          <Tooltip
            hasArrow
            trigger={
              <Button variant="ghost" size="sm" aria-label="More Information">
                <LuInfo />
              </Button>
            }
          >
            More Information
          </Tooltip>
        </Flex.H>
      </ExampleSection>

      {/* Use case: Truncated text */}
      <ExampleSection title="Use Case: Truncated Text">
        <Box maxWidth="200px">
          <Tooltip
            hasArrow
            trigger={
              <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" cursor="help">
                This is a very long text that gets truncated when it exceeds the container width
              </Text>
            }
          >
            This is a very long text that gets truncated when it exceeds the container width
          </Tooltip>
        </Box>
      </ExampleSection>
    </Flex.V>
  );
};
