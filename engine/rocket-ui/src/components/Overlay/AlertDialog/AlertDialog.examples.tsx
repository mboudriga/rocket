import { ExampleSection } from '@components/_examples';
import { Button } from '@components/Form/Button';
import { Box } from '@components/Layout/Box';
import { Divider } from '@components/Layout/Divider';
import { Flex } from '@components/Layout/Flex';
import { Text } from '@components/Typography/Text';
import { type FC, useState } from 'react';
import { AlertDialog } from './AlertDialog';

export const AlertDialogExamples: FC = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [discardOpen, setDiscardOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Flex.V gap="8">
      {/* Basic */}
      <ExampleSection title="Basic">
        <Button colorPalette="red" onClick={() => setDeleteOpen(true)}>
          Delete Item
        </Button>
        <AlertDialog
          open={deleteOpen}
          title="Delete Item?"
          closeOnInteractOutside
          onClose={() => setDeleteOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setDeleteOpen(false) },
            { children: 'Delete', colorPalette: 'red', onClick: () => setDeleteOpen(false) },
          ]}
        >
          <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
        </AlertDialog>
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
          <AlertDialog
            key={size}
            open={sizesOpen === size}
            title="Confirm Action"
            size={size}
            closeOnInteractOutside
            onClose={() => setSizesOpen(null)}
            buttons={[
              { children: 'Cancel', variant: 'outline', onClick: () => setSizesOpen(null) },
              { children: 'Confirm', colorPalette: 'blue', onClick: () => setSizesOpen(null) },
            ]}
          >
            <Text>This alert dialog has size: {size}</Text>
          </AlertDialog>
        ))}
      </ExampleSection>

      <Divider />

      {/* Use case: Discard changes */}
      <ExampleSection title="Use Case: Discard Changes">
        <Button variant="outline" onClick={() => setDiscardOpen(true)}>
          Cancel Edit
        </Button>
        <AlertDialog
          open={discardOpen}
          title="Discard Changes?"
          closeOnInteractOutside
          onClose={() => setDiscardOpen(false)}
          buttons={[
            { children: 'Keep Editing', variant: 'outline', onClick: () => setDiscardOpen(false) },
            { children: 'Discard', colorPalette: 'red', onClick: () => setDiscardOpen(false) },
          ]}
        >
          <Text>You have unsaved changes. Are you sure you want to discard them?</Text>
        </AlertDialog>
      </ExampleSection>

      {/* Use case: Logout confirmation */}
      <ExampleSection title="Use Case: Logout Confirmation">
        <Button variant="outline" onClick={() => setLogoutOpen(true)}>
          Log Out
        </Button>
        <AlertDialog
          open={logoutOpen}
          title="Log Out"
          closeOnInteractOutside
          onClose={() => setLogoutOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setLogoutOpen(false) },
            { children: 'Log Out', colorPalette: 'blue', onClick: () => setLogoutOpen(false) },
          ]}
        >
          <Text>
            Are you sure you want to log out? You will need to sign in again to access your account.
          </Text>
        </AlertDialog>
      </ExampleSection>

      {/* Use case: Dangerous action */}
      <ExampleSection title="Use Case: Dangerous Action">
        <Button colorPalette="red" variant="outline" onClick={() => setConfirmOpen(true)}>
          Delete Account
        </Button>
        <AlertDialog
          open={confirmOpen}
          title="Delete Account Permanently"
          closeOnInteractOutside
          onClose={() => setConfirmOpen(false)}
          buttons={[
            { children: 'Cancel', variant: 'outline', onClick: () => setConfirmOpen(false) },
            {
              children: 'Delete Forever',
              colorPalette: 'red',
              onClick: () => setConfirmOpen(false),
            },
          ]}
        >
          <Flex.V gap="3">
            <Text>
              This will permanently delete your account and all associated data including:
            </Text>
            <Box as="ul" paddingLeft="5" fontSize="sm">
              <li>Your profile information</li>
              <li>All your projects and files</li>
              <li>Your subscription and billing history</li>
            </Box>
            <Text fontWeight="semibold" color="red.fg">
              This action cannot be undone.
            </Text>
          </Flex.V>
        </AlertDialog>
      </ExampleSection>
    </Flex.V>
  );
};
