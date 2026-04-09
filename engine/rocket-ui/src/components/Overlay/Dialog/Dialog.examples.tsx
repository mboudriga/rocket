import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Input } from '@components/Form/Input';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { Dialog } from './Dialog';

export const DialogExamples: FC = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState<string | null>(null);
  const [placementOpen, setPlacementOpen] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Button onClick={() => setBasicOpen(true)}>Open Dialog</Button>
        <Dialog
          open={basicOpen}
          title="Basic Dialog"
          closeOnInteractOutside
          onClose={() => setBasicOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setBasicOpen(false) },
            { children: 'Confirm', colorPalette: 'blue', onClick: () => setBasicOpen(false) },
          ]}
        >
          <Text>This is a basic dialog with a title and action buttons.</Text>
        </Dialog>
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
          <Dialog
            key={size}
            open={sizesOpen === size}
            title={`${size.toUpperCase()} Dialog`}
            size={size}
            closeOnInteractOutside
            onClose={() => setSizesOpen(null)}
            buttons={[{ children: 'Close', onClick: () => setSizesOpen(null) }]}
          >
            <Text>This dialog has size: {size}</Text>
          </Dialog>
        ))}
      </ExampleSection>

      {/* Placement */}
      <ExampleSection title="Placement">
        <Flex.H gap="3" wrap="wrap">
          {(['center', 'top', 'bottom'] as const).map((placement) => (
            <Button key={placement} variant="outline" onClick={() => setPlacementOpen(placement)}>
              {placement}
            </Button>
          ))}
        </Flex.H>
        {(['center', 'top', 'bottom'] as const).map((placement) => (
          <Dialog
            key={placement}
            open={placementOpen === placement}
            title={`${placement} Placement`}
            placement={placement}
            closeOnInteractOutside
            onClose={() => setPlacementOpen(null)}
            buttons={[{ children: 'Close', onClick: () => setPlacementOpen(null) }]}
          >
            <Text>This dialog is positioned at the {placement}.</Text>
          </Dialog>
        ))}
      </ExampleSection>

      <Divider />

      {/* Use case: Form dialog */}
      <ExampleSection title="Use Case: Form Dialog">
        <Button colorPalette="blue" onClick={() => setFormOpen(true)}>
          Create Account
        </Button>
        <Dialog
          open={formOpen}
          title="Create Account"
          closeOnInteractOutside
          onClose={() => setFormOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setFormOpen(false) },
            { children: 'Create', colorPalette: 'blue', onClick: () => setFormOpen(false) },
          ]}
        >
          <Flex.V gap="4">
            <Input label="Full Name" placeholder="John Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
          </Flex.V>
        </Dialog>
      </ExampleSection>

      {/* Use case: Scrollable content */}
      <ExampleSection title="Use Case: Scrollable Content">
        <Button variant="outline" onClick={() => setScrollOpen(true)}>
          Open Scrollable Dialog
        </Button>
        <Dialog
          open={scrollOpen}
          title="Terms of Service"
          scrollBehavior="inside"
          closeOnInteractOutside
          onClose={() => setScrollOpen(false)}
          buttons={[
            { children: 'Decline', variant: 'outline', onClick: () => setScrollOpen(false) },
            { children: 'Accept', colorPalette: 'blue', onClick: () => setScrollOpen(false) },
          ]}
        >
          <Flex.V gap="4">
            {Array.from({ length: 25 }, (_, i) => (
              <Text key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            ))}
          </Flex.V>
        </Dialog>
      </ExampleSection>
    </Flex.V>
  );
};
