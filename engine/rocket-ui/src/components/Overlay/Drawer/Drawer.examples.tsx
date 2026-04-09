import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Drawer } from './Drawer';

export const DrawerExamples: FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [placementOpen, setPlacementOpen] = useState<string | null>(null);
  const [sizesOpen, setSizesOpen] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Button onClick={() => setBasicOpen(true)}>Open Drawer</Button>
        <Drawer
          open={basicOpen}
          title="Basic Drawer"
          onClose={() => setBasicOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setBasicOpen(false) },
            { children: 'Save', colorPalette: 'blue', onClick: () => setBasicOpen(false) },
          ]}
        >
          <Text>This is a basic drawer that slides in from the side.</Text>
        </Drawer>
      </ExampleSection>

      {/* Placements */}
      <ExampleSection title="Placements">
        <Flex.H gap="3" wrap="wrap">
          {(['start', 'end', 'top', 'bottom'] as const).map((placement) => (
            <Button key={placement} variant="outline" onClick={() => setPlacementOpen(placement)}>
              {placement}
            </Button>
          ))}
        </Flex.H>
        {(['start', 'end', 'top', 'bottom'] as const).map((placement) => (
          <Drawer
            key={placement}
            open={placementOpen === placement}
            title={`${placement} Drawer`}
            placement={placement}
            onClose={() => setPlacementOpen(null)}
            buttons={[{ children: 'Close', onClick: () => setPlacementOpen(null) }]}
          >
            <Text>This drawer slides in from the {placement}.</Text>
          </Drawer>
        ))}
      </ExampleSection>

      {/* Sizes */}
      <ExampleSection title="Sizes">
        <Flex.H gap="3" wrap="wrap">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Button key={size} variant="outline" onClick={() => setSizesOpen(size)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </Flex.H>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Drawer
            key={size}
            open={sizesOpen === size}
            title={`${size.toUpperCase()} Size`}
            size={size}
            onClose={() => setSizesOpen(null)}
            buttons={[{ children: 'Close', onClick: () => setSizesOpen(null) }]}
          >
            <Text>This drawer has size: {size}</Text>
          </Drawer>
        ))}
      </ExampleSection>

      <Divider />

      {/* Use case: Settings panel */}
      <ExampleSection title="Use Case: Settings Panel">
        <Button colorPalette="blue" onClick={() => setFormOpen(true)}>
          Open Settings
        </Button>
        <Drawer
          open={formOpen}
          title="Account Settings"
          size="md"
          onClose={() => setFormOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setFormOpen(false) },
            { children: 'Save Changes', colorPalette: 'blue', onClick: () => setFormOpen(false) },
          ]}
        >
          <Flex.V gap="5">
            <Input label="Display Name" defaultValue="John Doe" />
            <Input label="Email" type="email" defaultValue="john@example.com" />
            <Input label="Bio" placeholder="Tell us about yourself" />
            <Box>
              <Text fontWeight="semibold" marginBottom="2">
                Notifications
              </Text>
              <Flex.V gap="2" fontSize="sm">
                <Text>Email notifications: Enabled</Text>
                <Text>Push notifications: Disabled</Text>
              </Flex.V>
            </Box>
          </Flex.V>
        </Drawer>
      </ExampleSection>

      {/* Use case: Navigation menu */}
      <ExampleSection title="Use Case: Navigation Menu">
        <Button variant="outline" onClick={() => setNavOpen(true)}>
          Open Navigation
        </Button>
        <Drawer
          open={navOpen}
          title="Navigation"
          placement="start"
          size="sm"
          onClose={() => setNavOpen(false)}
        >
          <Flex.V gap="1">
            {['Dashboard', 'Projects', 'Team', 'Settings', 'Help'].map((item) => (
              <Box
                key={item}
                padding="3"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: 'bg.subtle' }}
                onClick={() => setNavOpen(false)}
              >
                <Text>{item}</Text>
              </Box>
            ))}
          </Flex.V>
        </Drawer>
      </ExampleSection>
    </Flex.V>
  );
};
